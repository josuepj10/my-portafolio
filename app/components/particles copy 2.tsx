"use client";

import { useMousePosition } from "@/util/mouse";
import React, { useRef, useEffect, useState } from "react";

interface ParticlesProps {
	className?: string;
	quantity?: number;
	staticity?: number;
	ease?: number;
	refresh?: boolean;
	connectivity?: number;
	speed?: number;
}

export default function Particles({
	className = "",
	quantity = 50, // Cantidad base de partículas en pantallas grandes
	staticity = 50,
	ease = 50,
	refresh = false,
	connectivity = 100,
	speed = 0.1,
}: ParticlesProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const circles = useRef<any[]>([]);
	const mousePosition = useMousePosition();
	const mouse = useRef<{ x: number; y: number }>({ x: -9999, y: -9999 });
	const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
	const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
	const [adjustedQuantity, setAdjustedQuantity] = useState(quantity);

	// Ajusta la cantidad de partículas en función del tamaño de la pantalla
	useEffect(() => {
		const updateQuantity = () => {
			const width = window.innerWidth;
			if (width < 480) setAdjustedQuantity(Math.max(10, quantity * 0.3)); // Teléfonos
			else if (width < 768) setAdjustedQuantity(Math.max(20, quantity * 0.6)); // Tablets
			else setAdjustedQuantity(quantity); // Pantallas grandes
		};

		updateQuantity();
		window.addEventListener("resize", updateQuantity);
		return () => window.removeEventListener("resize", updateQuantity);
	}, [quantity]);

	useEffect(() => {
		if (canvasRef.current) {
			context.current = canvasRef.current.getContext("2d");
		}
		initCanvas();
		animate();
		window.addEventListener("resize", initCanvas);

		return () => {
			window.removeEventListener("resize", initCanvas);
		};
	}, []);

	useEffect(() => {
		onMouseMove();
	}, [mousePosition.x, mousePosition.y]);

	useEffect(() => {
		initCanvas();
	}, [refresh, adjustedQuantity]);

	const initCanvas = () => {
		resizeCanvas();
		drawParticles();
	};

	const onMouseMove = () => {
		if (canvasRef.current) {
			const rect = canvasRef.current.getBoundingClientRect();
			mouse.current.x = mousePosition.x - rect.left;
			mouse.current.y = mousePosition.y - rect.top;
		}
	};

	type Circle = {
		x: number;
		y: number;
		dx: number;
		dy: number;
		size: number;
		alpha: number;
		targetAlpha: number;
		magnetism: number;
	};

	const resizeCanvas = () => {
		if (canvasContainerRef.current && canvasRef.current && context.current) {
			circles.current.length = 0;
			canvasSize.current.w = canvasContainerRef.current.offsetWidth;
			canvasSize.current.h = canvasContainerRef.current.offsetHeight;
			canvasRef.current.width = canvasSize.current.w * dpr;
			canvasRef.current.height = canvasSize.current.h * dpr;
			canvasRef.current.style.width = `${canvasSize.current.w}px`;
			canvasRef.current.style.height = `${canvasSize.current.h}px`;
			context.current.scale(dpr, dpr);
		}
	};

	const circleParams = (): Circle => {
		const x = Math.random() * canvasSize.current.w;
		const y = Math.random() * canvasSize.current.h;
		const angle = Math.random() * Math.PI * 2;
		const dx = Math.cos(angle) * speed;
		const dy = Math.sin(angle) * speed;
		const size = Math.random() * 2 + 0.5;
		const alpha = Math.random() * 0.5 + 0.3;
		const targetAlpha = alpha;
		const magnetism = 1 + Math.random() * 4;
		return { x, y, dx, dy, size, alpha, targetAlpha, magnetism };
	};

	const drawCircle = (circle: Circle) => {
		if (context.current) {
			context.current.beginPath();
			context.current.arc(circle.x, circle.y, circle.size, 0, 2 * Math.PI);
			context.current.fillStyle = `rgba(255, 255, 255, ${circle.alpha})`;
			context.current.fill();
		}
	};

	const clearContext = () => {
		if (context.current) {
			context.current.clearRect(
				0,
				0,
				canvasSize.current.w,
				canvasSize.current.h
			);
		}
	};

	const drawConnections = () => {
		if (!context.current) return;
		for (let i = 0; i < circles.current.length; i++) {
			for (let j = i + 1; j < circles.current.length; j++) {
				const circleA = circles.current[i];
				const circleB = circles.current[j];
				const dist = Math.hypot(circleA.x - circleB.x, circleA.y - circleB.y);
				if (dist < connectivity) {
					const opacity = 1 - dist / connectivity;
					context.current.beginPath();
					context.current.moveTo(circleA.x, circleA.y);
					context.current.lineTo(circleB.x, circleB.y);
					context.current.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
					context.current.lineWidth = 0.5;
					context.current.stroke();
				}
			}
		}
	};

	const applyRepulsion = (circle: Circle) => {
		const distance = Math.hypot(
			circle.x - mouse.current.x,
			circle.y - mouse.current.y
		);
		if (distance < 100) {
			const angle = Math.atan2(circle.y - mouse.current.y, circle.x - mouse.current.x);
			const force = (100 - distance) / 100;
			circle.dx = lerp(circle.dx, Math.cos(angle) * force * 1.5, 0.1);
			circle.dy = lerp(circle.dy, Math.sin(angle) * force * 1.5, 0.1);
		}
	};

	const lerp = (start: number, end: number, amt: number) => {
		return (1 - amt) * start + amt * end;
	};

	const drawParticles = () => {
		clearContext();
		for (let i = 0; i < adjustedQuantity; i++) {
			const circle = circleParams();
			circles.current.push(circle);
			drawCircle(circle);
		}
	};

	const animate = () => {
		clearContext();
		circles.current.forEach((circle: Circle) => {
			applyRepulsion(circle);
			circle.x += lerp(circle.dx, 0, 0.02);
			circle.y += lerp(circle.dy, 0, 0.02);
			if (circle.x <= 0 || circle.x >= canvasSize.current.w) circle.dx *= -1;
			if (circle.y <= 0 || circle.y >= canvasSize.current.h) circle.dy *= -1;
			drawCircle(circle);
		});
		drawConnections();
		window.requestAnimationFrame(animate);
	};

	return (
		<div className={className} ref={canvasContainerRef} aria-hidden="true">
			<canvas ref={canvasRef} />
		</div>
	);
}
