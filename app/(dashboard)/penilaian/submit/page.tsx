"use client";

import axios from "axios";
import useSWR from "swr";
import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Loading from "@/app/loading";
import { getData } from "@/lib/fetcher";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const SubmitPage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [pertanyaan, setPertanyaan] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = async () => {
    try {
      setIsLoading(true);
      const response = await getData("/api/data/pertanyaan");
      setPertanyaan(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  const handleSubmit = async () => {
    console.log(selectedAnswer);
    console.log(JSON.stringify(pertanyaan));
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Questions</h1>
            <span className="text-sm text-slate-700">
              Berikan jawaban yang menurut anda paling tepat
            </span>
          </div>
          <Button className="bg-blue-950" onClick={handleSubmit}>
            Submit
          </Button>
          {/* <Actions
          courseId={course.id}
          isPublished={course.isPublished}
          disabled={!isComplete}
        /> */}
        </div>
        <div className="grid grid-cols-1 mt-16 gap-6">
          {pertanyaan.map((item: any) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle> {item.jenis} </CardTitle>
                <CardDescription>{item.kompetensi}</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="text-lg font-medium">{item.pertanyaan}</p>
                  <div className="flex items-center text-foreground/60 mt-6">
                    <div className="border-b w-[50px] dark:border-white/5"></div>
                    <p className="my-2 text-xs mx-2">Pilih jawaban</p>
                    <div className="border-b w-auto grow dark:border-white/5" />
                  </div>
                  {item.jawabanSet.map((jawaban: any, index: any) => (
                    <div
                      className="grid grid-cols-1 gap-4 hover:bg-zinc-100 dark:hover:text-black  p-3 rounded-md"
                      key={jawaban.id}
                    >
                      <div className="flex items-center gap-x-2">
                        <Button
                          onClick={() => setSelectedAnswer(jawaban.level)}
                          variant="outline"
                          className={cn(
                            "hover:bg-blue-900 dark:text-white hover:text-white",
                            selectedAnswer === jawaban.level &&
                              "bg-blue-950 text-white"
                          )}
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
        </div>
      </div>
    </ScrollArea>
  );
};

export default SubmitPage;
