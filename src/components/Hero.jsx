import React, { useEffect, useState, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const fullText = "Computer Science and AI/ML Student building intelligent projects and scalable solutions.";

  const [isLoading, setIsLoading] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootStatus, setBootStatus] = useState("Initializing kernel...");

  const [loss, setLoss] = useState(0.0034);
  const [epoch, setEpoch] = useState(2048);
  const [logs, setLogs] = useState([]);
  const [mouseCoords, setMouseCoords] = useState({ x: '0.0000', y: '0.0000' });
  
  const terminalRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;
      if (index >= fullText.length) {
        clearInterval(interval);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setBootProgress(100);
      setBootStatus("Render initialized.");
      return;
    }

    let progress = 0;
    const statusMsgs = [
      { threshold: 0, text: "Initializing kernel..." },
      { threshold: 20, text: "Mapping hardware acceleration..." },
      { threshold: 45, text: "Compiling GLSL vertex shaders..." },
      { threshold: 70, text: "Fetching neural weights..." },
      { threshold: 88, text: "Building mesh geometry..." }
    ];

    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 5) + 2;
      if (progress >= 99) {
        progress = 99;
        clearInterval(interval);
      }
      setBootProgress(progress);

      const msg = [...statusMsgs].reverse().find(m => progress >= m.threshold);
      if (msg) setBootStatus(msg.text);
    }, 80);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoss(l => +(l + (Math.random() - 0.5) * 0.0001).toFixed(6));
      setEpoch(e => e + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const bootLogs = [
      "[sys] kernel version 4.0.9 loading...",
      "[sys] webgl2 standard context established.",
      "[sys] vertex shaders compiled successfully.",
      "[sys] mapping neural network layers: [512, 1024, 256]",
      "[sys] synaptic node connections active (n=14,200).",
      "[sys] training status: running feedforward."
    ];

    bootLogs.forEach((log, idx) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log]);
      }, idx * 500);
    });

    let logCounter = 2048;
    const interval = setInterval(() => {
      logCounter++;
      const trainLoss = (0.0034 + (Math.random() - 0.5) * 0.0002).toFixed(6);
      const accuracy = (99.80 + Math.random() * 0.05).toFixed(2);
      const randomLogs = [
        `[train] Epoch ${logCounter} - loss: ${trainLoss} - acc: ${accuracy}%`,
        `[sys] backpropagation computed in ${Math.floor(Math.random() * 8) + 4}ms`,
        `[gpu] vram: ${(17.8 + Math.random() * 0.5).toFixed(1)}GB/24GB - temp: ${Math.floor(68 + Math.random() * 5)}°C`
      ];
      const newLog = randomLogs[Math.floor(Math.random() * randomLogs.length)];
      setLogs(prev => {
        const next = [...prev, newLog];
        if (next.length > 50) next.shift();
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
