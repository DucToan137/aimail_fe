import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { 
  Mail, 
  ArrowUpRight, 
  Search, 
  Clock, 
  Check, 
  Sparkles, 
  Shield, 
  CircleDot, 
  Layers, 
  ChevronRight
} from 'lucide-react';
import { ThemeToggle } from '../components/ui/ThemeToggle';

export const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState<'board' | 'summary' | 'search'>('board');

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans antialiased selection:bg-zinc-900 dark:selection:bg-zinc-100 selection:text-white dark:selection:text-zinc-950 transition-colors duration-200">
      {/* 1. Header Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#fafafa]/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo with Color Accent */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-7 h-7 rounded-md bg-zinc-950 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-950 shadow-xs group-hover:scale-95 transition-transform duration-150">
              <Mail className="w-3.5 h-3.5" />
            </div>
            <span className="font-semibold text-sm tracking-tight text-zinc-950 dark:text-zinc-100">
              AIEmail
            </span>
            <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.2 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60 font-medium">
              v1.0
            </span>
          </Link>

          {/* Center Links (Enlarged text-sm) */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-600 dark:text-zinc-300">
            <a href="#product" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Workspace</a>
            <a href="#features" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Workflow</a>
            <a href="#security" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Security</a>
          </nav>

          {/* Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            {isAuthenticated ? (
              <Link
                to="/inbox"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-white transition-colors shadow-xs"
              >
                Vào Hộp Thư
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-300 dark:text-zinc-600" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors px-2.5 py-1"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/login"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-white transition-colors shadow-xs"
                >
                  Kết nối Gmail
                  <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* 2. Hero Section: Clean Monochrome with Subtle Depth */}
        <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 px-6 text-center max-w-4xl mx-auto overflow-hidden">
          {/* Very subtle ambient light behind headline for depth */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gradient-to-tr from-blue-100/40 via-violet-100/30 to-emerald-100/40 dark:from-blue-900/20 dark:via-violet-900/15 dark:to-emerald-900/20 blur-[90px] pointer-events-none rounded-full" />

          {/* Tagline Badge with Color Sparkle */}
          <div className="relative inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200/90 dark:border-zinc-800 shadow-2xs mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-zinc-800 dark:text-zinc-200 font-medium">Gmail</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-blue-600 dark:text-blue-400 font-medium">Kanban Workflow</span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <span className="text-amber-600 dark:text-amber-400 font-medium">Gemini AI</span>
          </div>

          {/* Main Statement */}
          <h1 className="relative text-4xl sm:text-6xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.12]">
            Hộp thư gọn gàng.
            <br />
            Tâm trí thông suốt.
          </h1>

          <p className="relative mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Không gian làm việc biến đống email ngổn ngang thành bảng nhiệm vụ rõ ràng. 
            Tự động tóm tắt ý chính trong vài giây, tìm kiếm theo ngữ nghĩa và giúp bạn đạt trạng thái Inbox Zero mỗi ngày.
          </p>

          {/* Action CTAs */}
          <div className="relative mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={isAuthenticated ? "/inbox" : "/login"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-zinc-950 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-white text-white dark:text-zinc-950 text-sm font-medium transition-all shadow-xs group"
            >
              <span>Bắt đầu cùng Gmail</span>
              <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono bg-zinc-800 dark:bg-zinc-200 text-zinc-300 dark:text-zinc-700 rounded border border-zinc-700 dark:border-zinc-300 group-hover:border-zinc-600">
                G
              </kbd>
            </Link>
            <a
              href="#product"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-md bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 text-sm font-medium border border-zinc-200 dark:border-zinc-800 transition-colors shadow-2xs"
            >
              Xem giao diện làm việc
            </a>
          </div>

          {/* Neutral Micro Trust Cues with Colorful Icons */}
          <div className="relative mt-9 flex flex-wrap items-center justify-center gap-5 sm:gap-7 text-xs text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-blue-600" />
              Chuẩn Gmail REST API
            </span>
            <span className="text-zinc-300">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              Không lưu trữ mật khẩu
            </span>
            <span className="text-zinc-300">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-violet-600" />
              Bảo mật Token kép (JWT + OAuth)
            </span>
          </div>
        </section>

        {/* 3. The Product Workspace Canvas (OS-Neutral + Colorful Highlights) */}
        <section id="product" className="max-w-6xl mx-auto px-6 mb-24">
          <div className="rounded-xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-200/60 dark:shadow-none overflow-hidden">
            {/* Flat OS-Neutral Header */}
            <div className="h-11 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800 px-4 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
              {/* Neutral Brand & Location Tag */}
              <div className="flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[11px] text-zinc-800 dark:text-zinc-200 font-semibold tracking-wide">AIEmail Workspace</span>
                <span className="text-zinc-300 dark:text-zinc-700">/</span>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">inbox.kanban</span>
              </div>

              {/* Neutral Command Bar without ⌘K */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-zinc-500 text-xs w-72 shadow-2xs">
                <Search className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
                <span className="font-normal text-[11px] text-zinc-400 dark:text-zinc-400">Tìm hóa đơn máy chủ tuần trước...</span>
              </div>

              {/* View Selector Tabs with Colored Active States */}
              <div className="flex items-center rounded-md bg-zinc-100 dark:bg-zinc-800 p-0.5 border border-zinc-200 dark:border-zinc-700/80">
                <button 
                  onClick={() => setActiveTab('board')}
                  className={`px-2.5 py-0.5 text-[11px] font-medium rounded transition-all ${activeTab === 'board' ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-100 shadow-2xs font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-1.5" />
                  Kanban
                </button>
                <button 
                  onClick={() => setActiveTab('summary')}
                  className={`px-2.5 py-0.5 text-[11px] font-medium rounded transition-all ${activeTab === 'summary' ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-100 shadow-2xs font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
                  AI Tóm Tắt
                </button>
                <button 
                  onClick={() => setActiveTab('search')}
                  className={`px-2.5 py-0.5 text-[11px] font-medium rounded transition-all ${activeTab === 'search' ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-100 shadow-2xs font-semibold' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'}`}
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-violet-500 mr-1.5" />
                  Tìm Ngữ Nghĩa
                </button>
              </div>
            </div>

            {/* Workspace Canvas */}
            <div className="p-6 bg-[#fafafa] dark:bg-zinc-950 min-h-[420px]">
              {activeTab === 'board' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {/* Column 1: Inbox */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 pb-1 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="flex items-center gap-1.5 font-medium text-zinc-800 dark:text-zinc-200">
                        <CircleDot className="w-3.5 h-3.5 text-blue-500" />
                        HỘP THƯ ĐẾN
                      </span>
                      <span className="text-[11px] bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 px-1.5 py-0.2 rounded font-medium">2 thư</span>
                    </div>

                    {/* Card 1 */}
                    <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xs transition-all cursor-pointer">
                      <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mb-1.5">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">Google Cloud Alert</span>
                        <span className="font-mono text-[10px]">10:42 AM</span>
                      </div>
                      <p className="text-xs font-medium text-zinc-900 dark:text-zinc-200 leading-snug">Hạn mức API & tối ưu hóa chi phí định kỳ</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200/80 dark:border-blue-800/60 font-medium">
                          DevOps
                        </span>
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">Bấm [E] xong việc</span>
                      </div>
                    </div>

                    {/* Card 2 */}
                    <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-xs transition-all cursor-pointer">
                      <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mb-1.5">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">Kế toán Doanh nghiệp</span>
                        <span className="font-mono text-[10px]">08:15 AM</span>
                      </div>
                      <p className="text-xs font-medium text-zinc-900 dark:text-zinc-200 leading-snug">Bảng sao kê chi phí dịch vụ tháng 9</p>
                      <div className="mt-3 flex items-center gap-1.5">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/80 dark:border-amber-800/60 font-medium">
                          Tài chính
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Column 2: In Progress */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 pb-1 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="flex items-center gap-1.5 font-medium text-zinc-900 dark:text-zinc-100">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        ĐANG XỬ LÝ
                      </span>
                      <span className="text-[11px] bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 px-1.5 py-0.2 rounded font-medium">1 thư</span>
                    </div>

                    {/* Active working Card with Warm Amber/Gold Border */}
                    <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-100 shadow-sm cursor-pointer">
                      <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 mb-1.5">
                        <span className="font-semibold text-zinc-950 dark:text-zinc-50">Đối tác Phát triển</span>
                        <span className="font-mono text-[10px] text-amber-700 dark:text-amber-400 font-semibold bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 px-1.5 py-0.2 rounded">Hôm nay</span>
                      </div>
                      <p className="text-xs font-semibold text-zinc-950 dark:text-zinc-100 leading-snug">Thống nhất kế hoạch triển khai kiến trúc mới</p>
                      
                      {/* Integrated AI snippet inside task with Accent Box */}
                      <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800 text-[11px]">
                        <div className="flex items-center gap-1 text-amber-800 dark:text-amber-400 font-semibold text-[11px] mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                          <span>Gemini AI Tóm tắt:</span>
                        </div>
                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                          • Đã đồng ý cấu hình PostgreSQL pgvector.<br/>
                          • Cần hoàn tất kiểm thử đăng nhập trước 17:00.
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400">
                        <span>3 tin nhắn trong luồng</span>
                        <span className="text-amber-700 dark:text-amber-400 font-medium">Ưu tiên cao</span>
                      </div>
                    </div>
                  </div>

                  {/* Column 3: Done */}
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-500 dark:text-zinc-400 pb-1 border-b border-zinc-200 dark:border-zinc-800">
                      <span className="flex items-center gap-1.5 font-medium text-zinc-800 dark:text-zinc-200">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        ĐÃ HOÀN THÀNH
                      </span>
                      <span className="text-[11px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 px-1.5 py-0.2 rounded font-medium">12 thư</span>
                    </div>

                    {/* Completed items with green accents */}
                    <div className="p-3 rounded-lg bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors">
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span>Đội ngũ Thiết kế</span>
                        <span>Hôm qua</span>
                      </div>
                      <p className="text-xs line-through text-zinc-500 dark:text-zinc-500 font-medium">Bàn giao Design System và bảng màu UI mới</p>
                    </div>

                    <div className="p-3 rounded-lg bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200/70 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-colors">
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <span>Đăng ký Tên miền</span>
                        <span>20 Tháng 9</span>
                      </div>
                      <p className="text-xs line-through text-zinc-500 font-medium">Chứng chỉ SSL đã tự động gia hạn an toàn</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'summary' && (
                <div className="max-w-2xl mx-auto p-6 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs">
                  <div className="flex items-start justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4 mb-4">
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Email #84729</span>
                      <h4 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50 mt-0.5">Biên bản cuộc họp & Thống nhất mục tiêu tuần tới</h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">Từ: Trưởng nhóm Kỹ thuật &lt;lead@engineering.vn&gt;</p>
                    </div>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 font-medium flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                      Gemini 2.5 Flash
                    </span>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                      Điểm mấu chốt một dòng:
                    </p>
                    <p className="bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded border border-zinc-200 dark:border-zinc-800 font-mono text-zinc-800 dark:text-zinc-200 text-[11px]">
                      "Đã chốt phong cách giao diện đơn sắc sang trọng có điểm nhấn màu sắc, kiểm tra chất lượng trước khi triển khai chính thức."
                    </p>

                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 pt-2">Hành động cần làm tiếp theo (Action items):</p>
                    <ul className="space-y-1.5 pl-4 list-disc text-zinc-600 dark:text-zinc-400 text-xs">
                      <li>Hoàn thành cấu hình bảo mật Google OAuth2 và các scope Gmail cần thiết.</li>
                      <li>Áp dụng bộ font và bảng màu trắng đen tối giản, kết hợp màu trạng thái sinh động.</li>
                      <li>Đảm bảo hệ thống tra cứu ngữ nghĩa vector chạy ổn định trên PostgreSQL.</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'search' && (
                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-300 dark:border-zinc-700 shadow-2xs">
                    <Search className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                    <input 
                      type="text" 
                      readOnly 
                      value="Hóa đơn thanh toán máy chủ tuần trước" 
                      className="w-full text-xs font-sans text-zinc-900 dark:text-zinc-100 bg-transparent outline-none"
                    />
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800 font-medium">
                      Vector L2 Match (pgvector)
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">Thanh toán Điện toán đám mây</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">Độ tương đồng: 98.4%</span>
                      </div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-200">Biên nhận thanh toán hạ tầng máy chủ tháng 9 đã sẵn sàng</p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">Trích đoạn: Giao dịch thành công số tiền dịch vụ cơ sở dữ liệu và lưu trữ...</p>
                    </div>

                    <div className="p-3 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-xs hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mb-1">
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100">Cổng Thanh toán Trực tuyến</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">Độ tương đồng: 92.1%</span>
                      </div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-200">Xác nhận giao dịch thanh toán gói tài nguyên backend định kỳ</p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-1">Trích đoạn: Hóa đơn điện tử đã được ghi nhận tự động vào hòm thư...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Keyboard Bar with Color Badges */}
            <div className="bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-6 py-2.5 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-5">
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-[10px] shadow-2xs font-semibold">E</kbd>
                  <span className="text-zinc-700 dark:text-zinc-300">Xong việc / Lưu trữ</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-[10px] shadow-2xs font-semibold">S</kbd>
                  <span className="text-zinc-700 dark:text-zinc-300">Hẹn giờ (Snooze)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 text-[10px] shadow-2xs font-semibold">/</kbd>
                  <span className="text-zinc-700 dark:text-zinc-300">Tìm kiếm thông minh</span>
                </span>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Reactive Non-blocking Engine</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Bento Grid (Linear Style + Colorful Feature Accents) */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-200/80 dark:border-zinc-800">
          <div className="mb-12 max-w-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold">Triết lý thiết kế</span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 mt-1.5">
              Xây dựng cho sự tập trung và tốc độ xử lý.
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2.5 leading-relaxed">
              Mỗi tính năng được trau chuốt để loại bỏ sự phân tâm. Đọc nhanh hơn, ưu tiên việc chuẩn xác hơn và không còn nỗi ám ảnh với danh sách email dài bất tận.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Bento Block 1: Kanban Pipeline (Blue Accent) */}
            <div className="md:col-span-2 p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-md bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Quy trình Kanban Chuyển Trạng Thái</h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed max-w-lg">
                  Email không đơn thuần là văn bản mà chính là các đầu việc cần giải quyết. Dễ dàng chuyển thư từ Hộp thư đến Đang làm, hoặc Đã giải quyết. Đồng bộ hai chiều với nhãn Gmail mà không làm xáo trộn thói quen dùng hòm thư sẵn có của bạn.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-4 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Đồng bộ hai chiều Gmail
                </span>
                <span>•</span>
                <span>Zero message loss</span>
              </div>
            </div>

            {/* Bento Block 2: Gemini Intelligence (Amber Accent) */}
            <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-md bg-amber-50 dark:bg-amber-950/50 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-4">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Tóm Tắt Tinh Gọn</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  Nội dung email dài được cô đọng thành kết luận chính và việc cần làm chỉ trong tích tắc nhờ trí tuệ nhân tạo Gemini.
                </p>
              </div>

              <div className="mt-6 p-3 rounded bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/60 font-mono text-[11px] text-amber-900 dark:text-amber-300">
                <span>"Trích xuất ý chính và việc cần làm từ email chỉ với 1 click."</span>
              </div>
            </div>

            {/* Bento Block 3: Vector Semantic Search (Violet Accent) */}
            <div className="p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-md bg-violet-50 dark:bg-violet-950/50 border border-violet-200/80 dark:border-violet-800/60 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
                  <Search className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Tìm Kiếm Ngữ Nghĩa</h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed">
                  Tìm theo ý nghĩa thực sự của câu hỏi thay vì chỉ so khớp từng chữ cái. Mô hình nhúng Vector 768 chiều với PostgreSQL pgvector tìm ra đúng thư ngay cả khi không trùng từ khóa.
                </p>
              </div>

              <div className="mt-6 text-[11px] font-mono text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                <span>PostgreSQL + pgvector powered</span>
              </div>
            </div>

            {/* Bento Block 4: Smart Snooze (Emerald Accent) */}
            <div className="md:col-span-2 p-6 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex flex-col justify-between hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
              <div>
                <div className="w-8 h-8 rounded-md bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4">
                  <Clock className="w-4 h-4" />
                </div>
                <h3 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">Tạm Ẩn & Nhắc Nhở Đúng Lúc (Snooze)</h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1.5 leading-relaxed max-w-lg">
                  Tạm gác lại các email chưa cần giải quyết ngay để giải phóng sự chú ý của bạn. Tác vụ ngầm định kỳ tự động đưa email trở lại hộp thư chính xác vào thời điểm bạn đã lên lịch.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center gap-6 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Ẩn đến 09:00 sáng mai</span>
                <span>•</span>
                <span>Tác vụ phục hồi tự động</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Security & Trust Protocol */}
        <section id="security" className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-200/80">
          <div className="p-8 rounded-xl bg-zinc-950 text-zinc-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                <Shield className="w-3.5 h-3.5" />
                <span>Kiến trúc Bảo mật Cao cấp</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white">
                Không lưu mật khẩu. Chỉ yêu cầu quyền tối thiểu.
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-2 leading-relaxed">
                Hệ thống xác thực dựa trên chuẩn Google OAuth 2.0 và token JWT ngắn hạn có cơ chế xoay vòng. Mật khẩu Gmail của bạn hoàn toàn nằm ngoài tầm truy cập của cơ sở dữ liệu.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                to={isAuthenticated ? "/inbox" : "/login"}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-white text-zinc-950 text-xs font-semibold hover:bg-zinc-100 transition-colors shadow-xs"
              >
                <span>Mở Ứng Dụng</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 6. Neutral Editorial Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 text-zinc-500 dark:text-zinc-400 text-xs transition-colors">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b border-zinc-100 dark:border-zinc-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded bg-zinc-950 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-950">
                <Mail className="w-3 h-3" />
              </div>
              <span className="font-semibold text-zinc-950 dark:text-zinc-100 tracking-tight">AIEmail</span>
              <span className="text-zinc-400 dark:text-zinc-500 font-mono text-[11px]">— Không gian email năng suất</span>
            </div>

            <div className="flex items-center gap-6 text-zinc-600 dark:text-zinc-400 text-xs">
              <a href="#product" className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors">Workspace</a>
              <a href="#features" className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors">Tính năng</a>
              <a href="#security" className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors">Bảo mật</a>
              <Link to="/login" className="hover:text-zinc-950 dark:hover:text-zinc-100 transition-colors">Đăng nhập</Link>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] text-zinc-400 dark:text-zinc-500">
            <p>© {new Date().getFullYear()} AIEmail. Công cụ quản lý hòm thư tối giản dành cho Gmail.</p>
            <div className="flex items-center gap-4">
              <span className="text-zinc-600 dark:text-zinc-400">Tuân thủ Chính sách Google API Services</span>
              <span>•</span>
              <span className="text-zinc-600 dark:text-zinc-400">Mã hóa AES-256</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
