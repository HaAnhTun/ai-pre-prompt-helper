import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle, Info, BookHeart } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";
import { useCompletion } from "ai/react";

interface InterpretationResult {
  lessonsLearned: string;
  achievements: string;
  toneAnalysis: string;
  cheerUp: string;
}

interface Interpretation {
  process: string;
  result: InterpretationResult;
}

interface ResultItemProps {
  emoji: string;
  title: string;
  content: string;
  delay: number;
}

function stringToInterpretation(text: string): Interpretation | undefined {
  if (!text) return undefined;

  // Extract process section between interpretation_process tags
  // Match opening tag and capture everything after it
  const processMatch = text.match(
    /<report_analysis>([\s\S]*?)(?:<\/report_analysis>|$)/
  );
  const process = processMatch ? processMatch[1].trim() : "";

  // Try to extract and parse JSON after the process section
  try {
    const jsonMatch = text.match(/```json\s*({[\s\S]*?})\s*```/);
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[1]);
      return {
        process,
        result: {
          lessonsLearned: result.lessons_learned || "",
          achievements: result.achievements || "",
          toneAnalysis: result.tone_analysis || "",
          cheerUp: result.cheer_up || "",
        },
      };
    }
  } catch (e) {
    // If JSON parsing fails or is incomplete, return empty result
    console.error("Failed to parse JSON:", e);
  }
}


const ResultItem = ({ emoji, title, content, delay }: ResultItemProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="mb-2 flex items-start space-x-2"
  >
    <div>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        <span className="mr-1 font-semibold">
          {emoji} {title}
        </span>
        {content}
      </p>
    </div>
  </motion.div>
);

export default function CommunicationInterpreter() {
  const [context, setContext] = useState<string>("");

  const {
    completion,
    error,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    isLoading,
  } = useCompletion({
    api: "/api/completion",
    body: {
      context,
    },
    onResponse: (response) => {
      console.log("Raw API Response:", response);
    },
    onFinish: (result) => {
      console.log("Completion Result:", result);
      // Log parsed interpretation
      const parsed = stringToInterpretation(result);
      console.log("Parsed Interpretation:", parsed);
    },
  });
  

  const interpretation = stringToInterpretation(completion);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4"
    >
      <Card className="mx-auto w-full max-w-6xl bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 shadow-xl dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 border-none">
        <CardHeader className="space-y-2 pb-6">
          <CardTitle className="flex items-center justify-center gap-3 text-center text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <MessageCircle className="h-7 w-7 text-purple-500" />
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              AI Report Writer ✨
            </motion.span>
          </CardTitle>
          <CardDescription className="text-center text-lg text-gray-600 dark:text-gray-300 font-medium">
            Bạn không biết tuần vừa qua đã làm gì? nhưng AI của tôi sẽ biết!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="statement"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tuần vừa qua bạn đã làm được gì?
              </label>
              <Textarea
                id="context"
                placeholder="✨ Gợi ý nho nhỏ: 
                🚀 Code feature xịn xò nào đó
                🐛 Fix con bug khó nhằn
                🧪 Test các API lung tung
                📚 Training skill mới toanh
                🔍 Review code ae
                ⚡ Optimize cho nhanh hơn
                🛠️ Setup mấy cái tool hay ho
                🔬 Research công nghệ mới..."
                value={context}
                onChange={(e) => setContext(e.target.value)}
                className="w-full bg-white dark:bg-gray-700"
                rows={9}
              />
            </div>
            <div>
              <label
                htmlFor="statement"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Chọn ngữ điệu phù hợp
              </label>
              <Textarea
                id="statement"
                placeholder="Chọn ngữ điệu phù hợp:
                - Chuyên nghiệp & trang trọng (báo cáo sếp mới/khách hàng)
                - Thân thiện & tự tin (báo cáo sếp thân quen)
                - Cởi mở & gần gũi (báo cáo đồng nghiệp)
                - Thoải mái & chill (báo cáo team của mình)
                Có thể thay đổi nhân xưng ví dụ (em/tôi/mình...)"
                value={input}
                onChange={handleInputChange}
                className="w-full bg-white dark:bg-gray-700"
                rows={6}
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                className="flex-1 bg-purple-500 text-white hover:bg-purple-600"
                disabled={isLoading || input.length === 0}
                onClick={handleSubmit}
              >
                {isLoading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Đang tạo báo cáo...
                  </>
                ) : (
                  <>
                    <BookHeart className="mr-2 h-4 w-4" /> Báo cáo tuần!
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => {
                  setInput("");
                  setContext("");
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>

        {error && (
          <CardContent>
            <p className="text-red-500">{error.message}</p>
          </CardContent>
        )}

        <AnimatePresence>
          {interpretation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CardFooter className="flex flex-col space-y-4 p-6">
                <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="col-span-2 rounded-xl bg-white/80 backdrop-blur-sm p-6 shadow-lg dark:bg-gray-800/90"
                  >
                    <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-purple-700 dark:text-purple-400">
                      <Info className="h-6 w-6" />
                      Phân tích công việc tuần qua
                    </h3>
                    <ReactMarkdown className="prose prose-sm max-w-none dark:prose-invert">
                      {interpretation.process}
                    </ReactMarkdown>
                  </motion.div>

                  {interpretation.result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="rounded-xl bg-white/80 backdrop-blur-sm p-6 shadow-lg dark:bg-gray-800/90"
                    >
                      <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-green-600 dark:text-green-400">
                        <BookHeart className="h-6 w-6" />
                        Tổng kết tuần qua
                      </h3>
                      <ResultItem
                        emoji="🎯"
                        title="Bài học:"
                        content={interpretation.result.lessonsLearned}
                        delay={0.6}
                      />
                      <ResultItem
                        emoji="🏆"
                        title="Thành tựu:"
                        content={interpretation.result.achievements}
                        delay={0.7}
                      />
                      <ResultItem
                        emoji="💬"
                        title="Giọng điệu:"
                        content={interpretation.result.toneAnalysis}
                        delay={0.8}
                      />
                      <ResultItem
                        emoji="✨"
                        title="Động viên:"
                        content={interpretation.result.cheerUp}
                        delay={0.9}
                      />
                    </motion.div>
                  )}
                </div>
              </CardFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}
