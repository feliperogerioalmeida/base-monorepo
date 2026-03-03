"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/ui/card";
import { ArrowLeft, CheckCircle2, Loader2, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { authClient } from "../client";
import type { VerifyEmailCardProps } from "../types";

type VerificationStatus = "verifying" | "success" | "error";

export const VerifyEmailCard = ({
  labels,
  token,
  signInHref,
  onSuccess,
  onError,
}: VerifyEmailCardProps) => {
  const [status, setStatus] = useState<VerificationStatus>("verifying");

  useEffect(() => {
    const verifyToken = async () => {
      const { error } = await authClient.verifyEmail({ query: { token } });

      if (error) {
        setStatus("error");
        const message = error.message ?? error.statusText;
        if (onError) {
          onError(message);
        } else {
          toast.error(message);
        }
        return;
      }

      setStatus("success");
      onSuccess?.();
    };

    verifyToken();
  }, [token]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex w-full flex-col sm:max-w-sm">
      <Card className="relative gap-4 overflow-hidden pt-0 shadow-md">
        <div className="gradient-auth-accent h-1" />

        <CardHeader className="text-center">
          {status === "verifying" && (
            <>
              <div className="mx-auto mb-2">
                <Loader2 className="text-muted-foreground size-12 animate-spin" />
              </div>
              <CardTitle className="text-xl tracking-tight">
                {labels.verifyingTitle}
              </CardTitle>
              <CardDescription>
                {labels.verifyingDescription}
              </CardDescription>
            </>
          )}
          {status === "success" && (
            <>
              <div className="bg-primary/10 mx-auto mb-2 flex size-14 items-center justify-center rounded-full">
                <CheckCircle2 className="text-primary size-7" />
              </div>
              <CardTitle className="text-xl tracking-tight">
                {labels.successTitle}
              </CardTitle>
              <CardDescription>
                {labels.successDescription}
              </CardDescription>
            </>
          )}
          {status === "error" && (
            <>
              <div className="bg-destructive/10 mx-auto mb-2 flex size-14 items-center justify-center rounded-full">
                <XCircle className="text-destructive size-7" />
              </div>
              <CardTitle className="text-xl tracking-tight">
                {labels.errorTitle}
              </CardTitle>
              <CardDescription>{labels.errorDescription}</CardDescription>
            </>
          )}
        </CardHeader>

        {status !== "verifying" && (
          <CardContent className="text-center">
            <Link
              href={signInHref}
              className="text-muted-foreground hover:text-primary inline-flex items-center gap-1 text-sm transition-colors"
            >
              <ArrowLeft className="size-3" />
              {labels.backToSignInLink}
            </Link>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
