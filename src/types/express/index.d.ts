import express from "express";

declare global {
  namespace Express {
    interface Request {
        accountId?: Record<string,any>
    }
  }
}