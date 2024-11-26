# AI Report Writer ✨ - Trợ lý viết báo cáo thông minh

## Giới thiệu

AI Report Writer là một ứng dụng web giúp bạn tạo ra các báo cáo công việc một cách chuyên nghiệp và thông minh. Ứng dụng sử dụng AI để phân tích công việc của bạn và tạo ra báo cáo với nhiều góc nhìn khác nhau, phù hợp với từng đối tượng người đọc.

## Tính năng chính

- 📝 Tự động phân tích và tổng hợp công việc từ input của người dùng
- 🎯 Trích xuất bài học và thành tựu đạt được
- 💬 Tùy chỉnh giọng điệu báo cáo theo đối tượng:
  - Chuyên nghiệp & trang trọng (báo cáo sếp mới/khách hàng)
  - Thân thiện & tự tin (báo cáo sếp thân quen) 
  - Cởi mở & gần gũi (báo cáo đồng nghiệp)
  - Thoải mái & chill (báo cáo team của mình)
- ✨ Tự động tạo lời động viên, khích lệ
- 🎨 Giao diện người dùng thân thiện với animation đẹp mắt
- 🌙 Hỗ trợ Dark mode

## Tech Stack

- [Next.js](https://nextjs.org/) - React framework
- [Shadcn/ui](https://ui.shadcn.com) - UI components 
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [TypeScript](https://www.typescriptlang.org) - Type-safe JavaScript
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Vercel AI SDK](https://sdk.vercel.ai/) - SDK for AI features

## Cài đặt và Phát triển

1. Clone repository:
```bash
git clone https://github.com/yourusername/ai-report-writer
cd ai-report-writer
```

2. Cài đặt dependencies:
```bash
npm install
# hoặc
yarn install
```

3. Copy file `.env.example` thành `.env` và thêm API key cho model AI bạn muốn sử dụng. Chỉ cần 1 trong 3 model là đuợc.

```bash
cp .env.example .env
```

```bash
OPENAI_API_KEY=sk-xxx
# hoặc
ANTHROPIC_API_KEY=sk-ant-xxx
# hoặc
GOOGLE_API_KEY=xxx
```

Bạn có thể lấy API Key tại:
- Google (Free): <https://aistudio.google.com/u/1/apikey>
- OpenAI : <https://platform.openai.com/api-keys>
- Anthropic: <https://console.anthropic.com/settings/keys>

4. Chạy development server:
```bash
npm run dev
# hoặc
yarn dev
```
