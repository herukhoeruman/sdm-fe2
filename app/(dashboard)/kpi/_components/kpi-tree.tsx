"use client";

import { Fragment, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { KpiDefinitionTree } from "@/lib/redux";

interface KpiTreeProps {
  data: KpiDefinitionTree[];
}

export const KpiTree = ({ data }: KpiTreeProps) => {
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set());

  const toggleExpanded = (id: number) => {
    setExpandedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderRows = (items: KpiDefinitionTree[], depth = 0) =>
    items.map((item) => {
      const hasChildren = item.children.length > 0;
      const isExpanded = expandedIds.has(item.id);

      return (
        <Fragment key={item.id}>
          <TableRow>
            <TableCell className="min-w-[320px]">
              <div
                className="flex items-start gap-1"
                style={{ paddingLeft: `${depth * 24}px` }}
              >
                {hasChildren ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0"
                    aria-label={
                      isExpanded
                        ? `Tutup turunan ${item.name}`
                        : `Tampilkan turunan ${item.name}`
                    }
                    aria-expanded={isExpanded}
                    onClick={() => toggleExpanded(item.id)}
                  >
                    {isExpanded ? (
                      <HugeiconsIcon icon={ArrowDown01Icon} size={16} strokeWidth={1.5} aria-hidden="true" />
                    ) : (
                      <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={1.5} aria-hidden="true" />
                    )}
                  </Button>
                ) : (
                  <span className="block h-7 w-7 shrink-0" />
                )}

                <div className="min-w-0 pt-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <p className="font-medium">{item.ownerName}</p>
              <p className="text-xs text-muted-foreground">
                ID {item.ownerId}
              </p>
            </TableCell>
            <TableCell>{item.unit}</TableCell>
            <TableCell>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                {item.level}
              </span>
            </TableCell>
            <TableCell>
              <span className="rounded-full bg-muted px-2 py-1 text-xs text-muted-foreground">
                {item.status}
              </span>
            </TableCell>
            <TableCell className="text-right tabular-nums">{item.weight}%</TableCell>
            <TableCell className="text-right tabular-nums">
              {item.cascadeRatio}%
            </TableCell>
          </TableRow>

          {hasChildren && isExpanded && renderRows(item.children, depth + 1)}
        </Fragment>
      );
    });

  if (!data.length) {
    return (
      <div className="rounded-xl border border-dashed bg-card p-10 text-center text-sm text-muted-foreground">
        Data hierarchy KPI tidak ditemukan.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <Table className="min-w-[850px]">
        <TableHeader>
          <TableRow>
            <TableHead>KPI</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Unit</TableHead>
            <TableHead>Level</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right tabular-nums">Bobot</TableHead>
            <TableHead className="text-right tabular-nums">Cascade Ratio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderRows(data)}</TableBody>
      </Table>
    </div>
  );
};
