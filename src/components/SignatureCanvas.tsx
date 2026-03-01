"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pen, Type, Trash2, Undo2 } from "lucide-react";

interface SignatureCanvasProps {
    onSignatureChange: (dataUrl: string | null) => void;
}

export default function SignatureCanvas({ onSignatureChange }: SignatureCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mode, setMode] = useState<"draw" | "type">("draw");
    const [isDrawing, setIsDrawing] = useState(false);
    const [typedName, setTypedName] = useState("");
    const [hasDrawn, setHasDrawn] = useState(false);
    const [paths, setPaths] = useState<{ x: number; y: number }[][]>([]);
    const [currentPath, setCurrentPath] = useState<{ x: number; y: number }[]>([]);

    // ─── Canvas Setup ──────────────────────────────────────────
    const setupCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        // Redraw all saved paths
        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.strokeStyle = "#1a1a2e";
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        paths.forEach((path) => {
            if (path.length < 2) return;
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            for (let i = 1; i < path.length; i++) {
                const mid = {
                    x: (path[i - 1].x + path[i].x) / 2,
                    y: (path[i - 1].y + path[i].y) / 2,
                };
                ctx.quadraticCurveTo(path[i - 1].x, path[i - 1].y, mid.x, mid.y);
            }
            ctx.stroke();
        });
    }, [paths]);

    useEffect(() => {
        if (mode === "draw") {
            setupCanvas();
        }
    }, [mode, setupCanvas]);

    useEffect(() => {
        const handleResize = () => {
            if (mode === "draw") setupCanvas();
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [mode, setupCanvas]);

    // ─── Drawing Handlers ──────────────────────────────────────
    const getPos = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };
        const rect = canvas.getBoundingClientRect();
        if ("touches" in e) {
            return {
                x: e.touches[0].clientX - rect.left,
                y: e.touches[0].clientY - rect.top,
            };
        }
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        const pos = getPos(e);
        setIsDrawing(true);
        setCurrentPath([pos]);

        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
        }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        e.preventDefault();
        const pos = getPos(e);
        setCurrentPath((prev) => [...prev, pos]);

        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
            ctx.strokeStyle = "#1a1a2e";
            ctx.lineWidth = 2.5;
            ctx.lineCap = "round";
            ctx.lineJoin = "round";
            ctx.lineTo(pos.x, pos.y);
            ctx.stroke();
        }
    };

    const stopDrawing = () => {
        if (!isDrawing) return;
        setIsDrawing(false);
        if (currentPath.length > 1) {
            const newPaths = [...paths, currentPath];
            setPaths(newPaths);
            setHasDrawn(true);
            // Export signature
            if (canvasRef.current) {
                onSignatureChange(canvasRef.current.toDataURL("image/png"));
            }
        }
        setCurrentPath([]);
    };

    // ─── Actions ───────────────────────────────────────────────
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext("2d");
            if (ctx) {
                const rect = canvas.getBoundingClientRect();
                ctx.clearRect(0, 0, rect.width, rect.height);
            }
        }
        setPaths([]);
        setCurrentPath([]);
        setHasDrawn(false);
        setTypedName("");
        onSignatureChange(null);
    };

    const undoLast = () => {
        if (paths.length === 0) return;
        const newPaths = paths.slice(0, -1);
        setPaths(newPaths);
        if (newPaths.length === 0) {
            setHasDrawn(false);
            onSignatureChange(null);
        } else {
            // Redraw and export
            setTimeout(() => {
                if (canvasRef.current) {
                    onSignatureChange(canvasRef.current.toDataURL("image/png"));
                }
            }, 50);
        }
    };

    const switchMode = (newMode: "draw" | "type") => {
        clearCanvas();
        setMode(newMode);
    };

    // ─── Type Mode: Generate signature image from typed name ──
    useEffect(() => {
        if (mode !== "type" || !typedName.trim()) {
            if (mode === "type") onSignatureChange(null);
            return;
        }

        // Create an offscreen canvas with the typed name
        const canvas = document.createElement("canvas");
        canvas.width = 600;
        canvas.height = 150;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, 600, 150);
        ctx.font = '48px "Dancing Script", cursive';
        ctx.fillStyle = "#1a1a2e";
        ctx.textBaseline = "middle";
        ctx.fillText(typedName, 30, 75);

        onSignatureChange(canvas.toDataURL("image/png"));
    }, [typedName, mode, onSignatureChange]);

    return (
        <div className="w-full">
            {/* Mode Toggle */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => switchMode("draw")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${mode === "draw"
                        ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                >
                    <Pen className="w-4 h-4" />
                    Draw
                </button>
                <button
                    onClick={() => switchMode("type")}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${mode === "type"
                        ? "bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/25"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                >
                    <Type className="w-4 h-4" />
                    Type
                </button>

                {/* Actions */}
                <div className="ml-auto flex gap-2">
                    {mode === "draw" && paths.length > 0 && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={undoLast}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors"
                        >
                            <Undo2 className="w-3.5 h-3.5" />
                            Undo
                        </motion.button>
                    )}
                    {(hasDrawn || typedName) && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={clearCanvas}
                            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                        >
                            <Trash2 className="w-3.5 h-3.5" />
                            Clear
                        </motion.button>
                    )}
                </div>
            </div>

            {/* Signature Area */}
            <AnimatePresence mode="wait">
                {mode === "draw" ? (
                    <motion.div
                        key="draw"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="relative"
                    >
                        <canvas
                            ref={canvasRef}
                            className="w-full h-[150px] rounded-2xl border-2 border-dashed border-gray-200 bg-white cursor-crosshair touch-none"
                            style={{ touchAction: "none" }}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                        />
                        {!hasDrawn && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <p className="text-gray-300 text-sm font-medium">
                                    Draw your signature here
                                </p>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="type"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <input
                            type="text"
                            value={typedName}
                            onChange={(e) => setTypedName(e.target.value)}
                            placeholder="Type your full name"
                            className="w-full h-[150px] rounded-2xl border-2 border-dashed border-gray-200 bg-white px-8 text-center text-4xl text-gray-900 placeholder:text-gray-300 placeholder:text-lg focus:outline-none focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all"
                            style={{ fontFamily: 'var(--font-dancing-script, "Dancing Script"), cursive' }}
                            autoComplete="off"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Help text */}
            <p className="text-xs text-gray-400 mt-2 text-center">
                {mode === "draw"
                    ? "Use your mouse or finger to draw your signature"
                    : "Type your full legal name — it will render as a signature"}
            </p>
        </div>
    );
}
