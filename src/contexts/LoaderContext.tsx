"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";

// List of assets to preload
const ASSETS_TO_PRELOAD = {
  videos: ["/videos/Fractal.mp4", "/videos/Lemma.mp4"],
  images: [] as string[], // Add image URLs here if needed
};

const MINIMUM_LOADER_TIME = 3000; // 3 seconds
const SESSION_STORAGE_KEY = "assets_loaded";

type LoaderContextType = {
  isLoading: boolean;
  progress: number;
};

const LoaderContext = createContext<LoaderContextType>({
  isLoading: true,
  progress: 0,
});

export const useLoader = () => useContext(LoaderContext);

/**
 * Preload a single image
 */
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

/**
 * Preload a single video (loads metadata and some buffer)
 */
const preloadVideo = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    // Skip invalid URLs
    if (!src || src === "#") {
      resolve();
      return;
    }

    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    
    let resolved = false;
    
    const cleanup = () => {
      if (!resolved) {
        resolved = true;
        video.onloadeddata = null;
        video.onerror = null;
        resolve();
      }
    };
    
    // Use loadeddata event - fires when first frame is available
    video.onloadeddata = cleanup;
    
    video.onerror = () => {
      console.warn(`Video preload warning: ${src}`);
      cleanup();
    };
    
    // Timeout fallback for videos that take too long (5 seconds)
    setTimeout(cleanup, 5000);
    
    video.src = src;
    video.load();
  });
};


// Helper to check if already loaded (runs synchronously)
const checkIfAlreadyLoaded = (): boolean => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(SESSION_STORAGE_KEY) === "true";
};

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  // Use lazy initializer to check sessionStorage BEFORE first render
  const [isLoading, setIsLoading] = useState(() => {
    // If already loaded in session, start with isLoading = false
    return !checkIfAlreadyLoaded();
  });
  const [progress, setProgress] = useState(() => {
    return checkIfAlreadyLoaded() ? 100 : 0;
  });
  const hasStartedLoading = useRef(false);

  const preloadAllAssets = useCallback(async (): Promise<void> => {
    const allAssets = [
      ...ASSETS_TO_PRELOAD.images.map((src) => preloadImage(src)),
      ...ASSETS_TO_PRELOAD.videos.map((src) => preloadVideo(src)),
    ];

    // If no assets, resolve immediately
    if (allAssets.length === 0) {
      return Promise.resolve();
    }

    // Track progress
    let loaded = 0;
    const total = allAssets.length;

    const trackedPromises = allAssets.map((promise) =>
      promise
        .then(() => {
          loaded++;
          // Only update progress up to 90% from assets, 
          // the last 10% is for the minimum time
          setProgress(Math.floor((loaded / total) * 90));
        })
        .catch(() => {
          loaded++;
          setProgress(Math.floor((loaded / total) * 90));
        })
    );

    await Promise.all(trackedPromises);
  }, []);

  useEffect(() => {
    // Prevent double execution in StrictMode
    if (hasStartedLoading.current) return;
    hasStartedLoading.current = true;

    // If already loaded (checked during init), don't do anything
    if (!isLoading) {
      return;
    }

    // Record start time - used to GUARANTEE minimum display time
    const startTime = Date.now();
    // Animate progress bar smoothly over minimum time
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const timeProgress = Math.min((elapsed / MINIMUM_LOADER_TIME) * 100, 100);
      setProgress((prev) => Math.max(prev, timeProgress));
    }, 50);

    const loadAssets = async () => {
      // Track if assets are done loading
      let assetsLoaded = false;
      
      // Start asset preloading (don't await yet)
      const assetsPromise = preloadAllAssets()
        .then(() => { assetsLoaded = true; })
        .catch(() => { assetsLoaded = true; }); // Even on error, mark as done

      // ALWAYS wait for minimum time - this is NON-NEGOTIABLE
      await new Promise<void>((resolve) => 
        setTimeout(resolve, MINIMUM_LOADER_TIME)
      );

      // After minimum time passed, wait for assets if they're still loading
      if (!assetsLoaded) {
        await assetsPromise;
      }

      // Calculate how much time actually passed (should be >= 3000ms)
      const elapsed = Date.now() - startTime;
      console.log(`Loader displayed for ${elapsed}ms`);

      // Clear interval and set final progress
      clearInterval(progressInterval);
      setProgress(100);

      // Small delay for the progress bar to visually reach 100%
      await new Promise((resolve) => setTimeout(resolve, 150));

      // Mark as loaded in session storage
      sessionStorage.setItem(SESSION_STORAGE_KEY, "true");

      // Hide loader
      setIsLoading(false);
    };

    loadAssets();

    return () => {
      clearInterval(progressInterval);
    };
  }, [preloadAllAssets, isLoading]);

  return (
    <LoaderContext.Provider value={{ isLoading, progress }}>
      {children}
    </LoaderContext.Provider>
  );
}
