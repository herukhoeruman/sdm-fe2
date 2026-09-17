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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkeletonPenilaian } from "../../_components/skeleton-penilaian";

const PersonalIdPage = ({ params }: { params: { personId: string } }) => {
  const router = useRouter();

  const { data: pertanyaan = [], isLoading: isQuestionsLoading } = useGetQuestionsQuery();
  const { data: userById, isLoading: isPersonLoading } = useGetPersonByIdQuery(
    params.personId
  );
  const { data: dataUser } = useGetMeQuery();
  const [submitAnswers, { isLoading: isSubmitting }] = useSubmitAnswersMutation();

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
    level: number
  ) => {
    const updatedAnswers = [...user.answers];
    const existingAnswerIndex = updatedAnswers.findIndex(
      (answer) => answer.pertanyaanId === pertanyaanId
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

      await submitAnswers({ data: user }).unwrap();
      toast.success("Jawaban berhasil disimpan");
      router.push("/penilaian");
    } catch (error) {
      console.log(error);
      toast.error("Gagal menyimpan jawaban");
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href="/penilaian"
              className="flex items-center hover:opacity-75 transition mb-6 text-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Penilaian Individu</h1>
            <span className="text-sm text-slate-700 dark:text-slate-100">
              Berikan jawaban yang menurut anda paling tepat
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 mt-16 gap-6">
          <div className="grid grid-cols text-sm text-slate-700 dark:text-slate-100">
            <p>{userById?.nama}</p>
            <p>{userById?.divisi}</p>
          </div>
          {pertanyaan.map((item, index) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="flex items-center justify-center h-12 w-12 p-6 rounded-full border-2 border-white bg-zinc-100 dark:bg-zinc-800 shadow-md transition-all hover:rotate-6 hover:bg-zinc-100 active:rotate-12 active:scale-90">
                    {index + 1}
                  </div>
                  <div className="grid">
                    <p className="text-lg font-medium">{item.pertanyaan}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <div className="flex items-center text-foreground/60 mt-6">
                    <div className="border-b w-[50px] dark:border-white/2"></div>
                    <p className="my-2 text-xs mx-2">Pilih jawaban</p>
                    <div className="border-b w-auto grow dark:border-white/2" />
                  </div>
                  {item.jawabanSet.map((jawaban, index) => (
                    <div
                      key={jawaban.id}
                      className="grid grid-cols-1 gap-4 hover:bg-zinc-100 dark:hover:bg-zinc-800 p-3 rounded-md"
                    >
                      <div className="flex items-center gap-x-2">
                        <Button
                          variant="outline"
                          className={cn(
                            "hover:bg-blue-900 dark:text-white hover:text-white",

                            user.answers.some(
                              (answer) =>
                                answer.pertanyaanId === item.id &&
                                answer.jawabanId === jawaban.id
                            )
                              ? "bg-blue-950 text-white"
                              : ""
                          )}
                          onClick={() =>
                            handleAnswerClick(
                              item.id,
                              jawaban.id,
                              jawaban.level
                            )
                          }
                        >
                          {String.fromCharCode(65 + index)}
                        </Button>
                        <div className="text-base">{jawaban.jawaban}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="flex flex-col md:flex-row items-center justify-end">
            <Button
              className="bg-blue-950 hover:bg-blue-900 dark:text-white w-full md:w-auto"
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Submit Jawaban"
              )}
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default PersonalIdPage;
