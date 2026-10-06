"use client";

import toast from "react-hot-toast";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  useGetMeQuery,
  useGetPersonByIdQuery,
  useGetQuestionsQuery,
  useSubmitAnswersMutation,
  type AssessmentPayload,
} from "@/lib/redux";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkeletonPenilaian } from "../../_components/skeleton-penilaian";

const PersonalIdPage = ({ params }: { params: { personId: string } }) => {
  const router = useRouter();

  const { data: pertanyaan = [], isLoading: isQuestionsLoading } =
    useGetQuestionsQuery();
  const { data: userById, isLoading: isPersonLoading } = useGetPersonByIdQuery(
    params.personId,
  );
  const { data: dataUser } = useGetMeQuery();
  const [submitAnswers, { isLoading: isSubmitting }] =
    useSubmitAnswersMutation();

  const [user, setUser] = useState<AssessmentPayload>({
    idUser: dataUser?.id,
    emailUser: dataUser?.email,
    idPerson: 0,
    emailPerson: "",
    parent: 0,
    answers: [],
  });

  useEffect(() => {
    if (!userById || !dataUser) return;
    setUser((current) => ({
      ...current,
      idUser: dataUser.id,
      emailUser: dataUser.email,
      idPerson: userById.id,
      emailPerson: userById.email,
      parent: userById.parent,
    }));
  }, [dataUser, userById]);

  if (isQuestionsLoading || isPersonLoading) return <SkeletonPenilaian />;

  const handleAnswerClick = (
    pertanyaanId: number,
    jawabanId: number,
    level: number,
  ) => {
    const updatedAnswers = [...user.answers];
    const existingAnswerIndex = updatedAnswers.findIndex(
      (answer) => answer.pertanyaanId === pertanyaanId,
    );

    if (existingAnswerIndex !== -1) {
      updatedAnswers[existingAnswerIndex] = { pertanyaanId, jawabanId, level };
    } else {
      updatedAnswers.push({ pertanyaanId, jawabanId, level });
    }

    setUser({
      ...user,
      answers: updatedAnswers,
    });
  };

  const handleSubmit = async () => {
    try {
      if (user.answers.length < pertanyaan.length) {
        return toast.error("Mohon menjawab semua pertanyaan!");
      }

      const res = await submitAnswers({ data: user }).unwrap();
      if (res.resultCode === "00") {
        router.replace("/penilaian");
        toast.success("Jawaban berhasil disimpan!");
      } else {
        toast.error(`Gagal menyimpan jawaban, ${res.message}`);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(
        `Gagal menyimpan jawaban, ${error.data?.message || error.message}`,
      );
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto w-full space-y-6 p-4 sm:p-6">
        <Link
          href="/penilaian"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Penilaian
        </Link>

        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">
            Penilaian Individu
          </h1>
          <p className="text-sm text-muted-foreground">
            Pilih satu jawaban yang paling sesuai untuk setiap pertanyaan.
          </p>
        </div>

        <Card className="border-primary/20 bg-gradient-to-br from-card to-accent/60">
          <CardContent className="grid gap-6 p-4 sm:grid-cols-2 sm:p-6">
            <div className="min-w-0 space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Pegawai yang dinilai
              </p>
              <p className="break-words text-lg font-semibold">
                {userById?.nama}
              </p>
              <p className="break-words text-sm text-muted-foreground">
                {[userById?.jabatan, userById?.divisi]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </div>
            <div className="space-y-3 self-center">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="font-medium">Progres penilaian</span>
                <span className="text-muted-foreground" aria-live="polite">
                  {user.answers.length} dari {pertanyaan.length} dijawab
                </span>
              </div>
              <div
                role="progressbar"
                aria-label="Progres penilaian"
                aria-valuemin={0}
                aria-valuemax={pertanyaan.length || 1}
                aria-valuenow={user.answers.length}
                className="h-2 overflow-hidden rounded-full bg-muted"
              >
                <div
                  className="h-full rounded-full bg-emerald-500 transition-all"
                  style={{
                    width: `${pertanyaan.length ? (user.answers.length / pertanyaan.length) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          {pertanyaan.map((item, questionIndex) => (
            <Card key={item.id}>
              <CardHeader className="space-y-3 p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold">
                    {questionIndex + 1}
                  </span>
                  <div className="min-w-0 space-y-1">
                    <p className="break-words text-xs font-medium text-muted-foreground">
                      {[item.jenis, item.kompetensi]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <CardTitle
                      id={`question-${item.id}`}
                      className="break-words text-base font-medium leading-relaxed sm:text-lg"
                    >
                      {item.pertanyaan}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 sm:p-6  ">
                <fieldset
                  disabled={isSubmitting}
                  aria-labelledby={`question-${item.id}`}
                  className="min-w-0 space-y-3"
                >
                  <legend className="mb-3 text-xs text-muted-foreground">
                    Pilih jawaban
                  </legend>
                  {item.jawabanSet.map((jawaban, answerIndex) => {
                    const selected = user.answers.some(
                      (answer) =>
                        answer.pertanyaanId === item.id &&
                        answer.jawabanId === jawaban.id,
                    );

                    return (
                      <label
                        key={jawaban.id}
                        className={cn(
                          "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 sm:p-4",
                          selected
                            ? "border-primary bg-primary/5"
                            : "hover:bg-muted/50",
                          isSubmitting && "cursor-not-allowed opacity-60",
                        )}
                      >
                        <input
                          type="radio"
                          name={`question-${item.id}`}
                          value={jawaban.id}
                          checked={selected}
                          onChange={() =>
                            handleAnswerClick(
                              item.id,
                              jawaban.id,
                              jawaban.level,
                            )
                          }
                          className="mt-2 h-4 w-4 shrink-0 accent-primary hidden"
                        />
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-md border text-sm font-medium",
                            selected
                              ? "border-primary bg-primary text-primary-foreground"
                              : "bg-background",
                          )}
                        >
                          {String.fromCharCode(65 + answerIndex)}
                        </span>
                        <span className="min-w-0 break-words text-sm leading-relaxed sm:text-base">
                          {jawaban.jawaban}
                        </span>
                      </label>
                    );
                  })}
                </fieldset>
              </CardContent>
            </Card>
          ))}
          {pertanyaan.length === 0 && (
            <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
              Belum ada pertanyaan penilaian tersedia.
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Jawab semua pertanyaan sebelum mengirim penilaian.
          </p>
          <Button
            disabled={isSubmitting || pertanyaan.length === 0}
            className="w-full sm:w-auto"
            onClick={handleSubmit}
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? "Menyimpan Jawaban..." : "Submit Jawaban"}
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};

export default PersonalIdPage;
