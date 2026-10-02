"use client";

import Link from "next/link";
import { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowRight01Icon,
  Calendar03Icon,
  DashboardSquare01Icon,
  Task01Icon,
  Clock01Icon,
  CheckmarkCircle02Icon,
  Target01Icon,
} from "@hugeicons/core-free-icons";

import Loading from "@/app/loading";
import { useGetMeQuery } from "@/lib/redux";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  dashboardSamples,
  samplePeriod,
  type DashboardRole,
} from "./_components/sample-data";

const metricStyles = [
  {
    icon: Task01Icon,
    tone: "border-t-primary",
    badge: "bg-accent text-primary",
  },
  {
    icon: Clock01Icon,
    tone: "border-t-amber-500",
    badge:
      "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300",
  },
  {
    icon: CheckmarkCircle02Icon,
    tone: "border-t-emerald-500",
    badge:
      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300",
  },
  {
    icon: Target01Icon,
    tone: "border-t-sky-500",
    badge: "bg-sky-50 text-sky-700 dark:bg-sky-950/50 dark:text-sky-300",
  },
];

const DashboardPage = () => {
  const { data: me, isLoading } = useGetMeQuery();
  const [previewRole, setPreviewRole] = useState<DashboardRole | null>(null);
  const defaultRole: DashboardRole = me?.roles?.includes("ROLE_SDM")
    ? "sdm"
    : me?.roles?.includes("ROLE_ADMIN")
      ? "admin"
      : "pegawai";
  const role = previewRole ?? defaultRole;
  const sample = dashboardSamples[role];
  const total = sample.progress.reduce((sum, item) => sum + item.total, 0);
  const completed = sample.progress.reduce(
    (sum, item) => sum + item.completed,
    0,
  );
  const percentage = total ? Math.round((completed / total) * 100) : 0;
  const canAccess = (href: string) => {
    if (href === "/users") return me?.roles?.includes("ROLE_ADMIN");
    if (["/generator", "/laporan", "/pegawai", "/kpi/sdm"].includes(href))
      return me?.roles?.includes("ROLE_SDM");
    if (href === "/kpi/pegawai") return me?.roles?.includes("ROLE_USER");
    return me?.roles?.some((item) => ["ROLE_USER", "ROLE_SDM"].includes(item));
  };

  if (isLoading) return <Loading />;

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6">
        <div className="flex flex-col gap-5 rounded-xl border border-primary/15 bg-gradient-to-r from-accent to-card p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0 space-y-2">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary">
              <HugeiconsIcon
                icon={DashboardSquare01Icon}
                size={20}
                strokeWidth={1.5}
                aria-hidden="true"
              />
              Dashboard {sample.label}
            </div>
            <h1 className="break-words text-2xl font-semibold tracking-tight">
              Halo, {me?.nama || me?.username || "Pengguna"}
            </h1>
            <p className="max-w-xl text-sm text-muted-foreground">
              {sample.description}
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Badge variant="outline" className="gap-1.5 bg-card">
                <HugeiconsIcon
                  icon={Calendar03Icon}
                  size={14}
                  aria-hidden="true"
                />
                {samplePeriod}
              </Badge>
              <Badge variant="secondary">Data Sample</Badge>
            </div>
          </div>
          <div className="w-full space-y-2 lg:w-44">
            <label
              htmlFor="dashboard-preview"
              className="text-xs font-medium text-muted-foreground"
            >
              Preview tampilan peran
            </label>
            <Select
              value={role}
              onValueChange={(value) => setPreviewRole(value as DashboardRole)}
            >
              <SelectTrigger id="dashboard-preview">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pegawai">Pegawai</SelectItem>
                <SelectItem value="sdm">SDM</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Angka, tugas, dan tenggat berikut merupakan contoh untuk preview
          dashboard. Akses cepat membuka halaman aplikasi sesuai hak akses Anda.
        </p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sample.metrics.map((metric, index) => (
            <Card
              key={metric.label}
              className={cn("border-t-4", metricStyles[index].tone)}
            >
              <CardContent className="space-y-3 p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm text-muted-foreground">
                    {metric.label}
                  </p>
                  <span
                    className={cn("rounded-lg p-2", metricStyles[index].badge)}
                  >
                    <HugeiconsIcon
                      icon={metricStyles[index].icon}
                      size={20}
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </span>
                </div>
                <p className="text-3xl font-semibold tabular-nums">
                  {metric.value}
                </p>
                <p className="text-xs text-muted-foreground">{metric.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-5">
          <Card className="min-w-0 xl:col-span-3">
            <CardHeader className="p-5">
              <CardTitle className="text-base">Perlu Ditindaklanjuti</CardTitle>
              <p className="text-sm text-muted-foreground">
                Prioritas dan batas waktu dalam periode berjalan.
              </p>
            </CardHeader>
            <CardContent className="divide-y p-5 pt-0">
              {sample.tasks.map((task) => (
                <div
                  key={task.title}
                  className="flex flex-col gap-4 py-5 last:pb-0 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0 space-y-2">
                    <h2 className="break-words text-sm font-semibold">
                      {task.title}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {task.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="secondary"
                        className={
                          task.status === "Prioritas"
                            ? "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                            : ""
                        }
                      >
                        {task.status}
                      </Badge>
                      <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                        <HugeiconsIcon
                          icon={Calendar03Icon}
                          size={14}
                          aria-hidden="true"
                        />
                        {task.date}
                      </span>
                    </div>
                  </div>
                  {canAccess(task.href) ? (
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="shrink-0"
                    >
                      <Link href={task.href}>
                        {task.action}
                        <HugeiconsIcon
                          icon={ArrowRight01Icon}
                          size={16}
                          className="ml-2"
                          aria-hidden="true"
                        />
                      </Link>
                    </Button>
                  ) : (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      Preview sample
                    </span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="min-w-0 xl:col-span-2">
            <CardHeader className="p-5">
              <CardTitle className="text-base">
                {role === "admin" ? "Distribusi Peran" : "Progres Penilaian"}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {role === "admin"
                  ? "Contoh pembagian 128 akun berdasarkan peran."
                  : "Jumlah penilaian selesai pada periode berjalan."}
              </p>
            </CardHeader>
            <CardContent className="space-y-5 p-5">
              {role !== "admin" && (
                <div className="flex items-center justify-between rounded-lg bg-accent/60 p-4">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Total selesai
                    </p>
                    <p className="mt-1 text-sm font-medium">
                      {completed} dari {total} penilaian
                    </p>
                  </div>
                  <span className="text-2xl font-semibold text-primary">
                    {percentage}%
                  </span>
                </div>
              )}
              {sample.progress.map((item) => {
                const value = Math.round((item.completed / item.total) * 100);
                return (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="font-medium">{item.label}</span>
                      <span className="text-muted-foreground">
                        {item.completed}/{item.total} · {value}%
                      </span>
                    </div>
                    <div
                      role="progressbar"
                      aria-label={item.label}
                      aria-valuenow={item.completed}
                      aria-valuemin={0}
                      aria-valuemax={item.total}
                      className="h-2 overflow-hidden rounded-full bg-muted"
                    >
                      <div
                        className="h-full rounded-full bg-primary"
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-semibold text-primary">Akses Cepat</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {sample.links.map((link) => {
              const content = (
                <>
                  <div className="min-w-0 space-y-1">
                    <h3 className="text-sm font-semibold">{link.title}</h3>
                    <p className="text-xs text-muted-foreground">
                      {link.description}
                    </p>
                  </div>
                  <HugeiconsIcon
                    icon={ArrowRight01Icon}
                    size={20}
                    className="shrink-0 text-primary"
                    aria-hidden="true"
                  />
                </>
              );
              const style =
                "flex items-center justify-between gap-3 rounded-xl border bg-card p-5 shadow-sm";
              return canAccess(link.href) ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    style,
                    "transition-colors hover:border-primary/40 hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  )}
                >
                  {content}
                </Link>
              ) : (
                <div key={link.href} className={cn(style, "opacity-60")}>
                  <div>
                    {content}
                    <p className="mt-2 text-xs text-muted-foreground">
                      Preview sample · akses sesuai peran
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </ScrollArea>
  );
};

export default DashboardPage;
