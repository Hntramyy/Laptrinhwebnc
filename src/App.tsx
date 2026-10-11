import { useState, useEffect } from 'react';
import { TH01App } from './th01/TH01App';
import { TH02App } from './th02/TH02App';
import { TH03App } from './th03';
import { TH04App } from './th04/TH04App';
import { TH05App } from './th05/TH05App';
import { TH06App } from './th06/TH06App';
import {
  Layers,
  FileCode,
  ShoppingCart,
  BookOpen,
  Heart,
  Zap,
  FlaskConical,
  Sparkles,
  PlusCircle,
  FolderPlus,
  ArrowRight,
} from 'lucide-react';
import './App.css';

type ActiveLab = 'th01' | 'th02' | 'th03' | 'th04' | 'th05' | 'th06' | 'new-lab';

export default function App() {
  const [activeLab, setActiveLab] = useState<ActiveLab>(() => {
    const saved = localStorage.getItem('webnc_active_lab');
    if (saved && ['th01', 'th02', 'th03', 'th04', 'th05', 'th06', 'new-lab'].includes(saved)) {
      return saved as ActiveLab;
    }
    return 'th06'; // Mặc định hiển thị bài mới nhất (TH06)
  });

  useEffect(() => {
    localStorage.setItem('webnc_active_lab', activeLab);
  }, [activeLab]);

  return (
    <div className="master-app-container">
      {/* MASTER TOP NAVIGATION BAR */}
      <header className="master-header">
        <div className="master-header-inner">
          {/* Logo & Subject Name */}
          <div className="master-brand">
            <div className="master-brand-logo">
              <Layers size={22} />
            </div>
            <div>
              <h1 className="master-brand-title">PTIT • Lập Trình Web Nâng Cao</h1>
              <p className="master-brand-subtitle">
                Kho lưu trữ bài tập thực hành tập trung (Unified Workspace)
              </p>
            </div>
          </div>

          {/* Navigation Switcher Tabs */}
          <nav className="master-nav-tabs">
            <button
              type="button"
              className={`master-tab-btn ${activeLab === 'th01' ? 'active' : ''}`}
              onClick={() => setActiveLab('th01')}
            >
              <FileCode size={16} />
              <span>TH01: TypeScript</span>
              <span className="master-tab-badge">Tuần 1</span>
            </button>

            <button
              type="button"
              className={`master-tab-btn ${activeLab === 'th02' ? 'active' : ''}`}
              onClick={() => setActiveLab('th02')}
            >
              <BookOpen size={16} />
              <span>TH02: Design Patterns</span>
              <span className="master-tab-badge">Tuần 2</span>
            </button>

            <button
              type="button"
              className={`master-tab-btn ${activeLab === 'th03' ? 'active' : ''}`}
              onClick={() => setActiveLab('th03')}
            >
              <ShoppingCart size={16} />
              <span>TH03: Redux Toolkit</span>
              <span className="master-tab-badge badge-bonus">Tuần 3</span>
            </button>

            <button
              type="button"
              className={`master-tab-btn ${activeLab === 'th04' ? 'active' : ''}`}
              onClick={() => setActiveLab('th04')}
            >
              <Heart size={16} className={activeLab === 'th04' ? 'fill-current' : ''} />
              <span>TH04: Zustand</span>
              <span className="master-tab-badge badge-rose">Tuần 4</span>
            </button>

            <button
              type="button"
              className={`master-tab-btn ${activeLab === 'th05' ? 'active' : ''}`}
              onClick={() => setActiveLab('th05')}
            >
              <Zap size={16} className={activeLab === 'th05' ? 'text-amber-300' : ''} />
              <span>TH05: Tối Ưu React</span>
              <span className="master-tab-badge badge-emerald">Tuần 5 ⚡</span>
            </button>

            <button
              type="button"
              className={`master-tab-btn ${activeLab === 'th06' ? 'active' : ''}`}
              onClick={() => setActiveLab('th06')}
            >
              <FlaskConical size={16} className={activeLab === 'th06' ? 'text-indigo-300' : ''} />
              <span>TH06: Kiểm Thử Phần Mềm</span>
              <span className="master-tab-badge badge-indigo">Tuần 6 🧪</span>
            </button>

            <button
              type="button"
              className={`master-tab-btn ${activeLab === 'new-lab' ? 'active' : ''}`}
              onClick={() => setActiveLab('new-lab')}
              title="Hướng dẫn mở rộng thêm các bài thực hành tiếp theo"
            >
              <PlusCircle size={16} />
              <span>+ Thêm Bài Mới</span>
            </button>
          </nav>

          {/* Status info */}
          <div className="master-status-tag">
            <Sparkles size={14} className="text-amber-400" />
            <span>Single Root Package</span>
          </div>
        </div>
      </header>

      {/* MASTER BODY CONTENT */}
      <main className="master-main-content">
        {/* Banner tóm tắt bài đang mở */}
        <div className="master-info-banner">
          <div className="master-info-banner-left">
            <span>Đang xem bài thực hành:</span>
            <strong>
              {activeLab === 'th01' && 'TH01 - TypeScript & OOP Order Management'}
              {activeLab === 'th02' && 'TH02 - React Compound Accordion & usePagination<T>'}
              {activeLab === 'th03' && 'TH03 - Redux Toolkit Cart Module & RTK Query'}
              {activeLab === 'th04' && 'TH04 - Zustand Favorites Store & So sánh RTK'}
              {activeLab === 'th05' && 'TH05 - Tối Ưu React (10.000 SP): Virtualization & Lighthouse 98/100'}
              {activeLab === 'th06' && 'TH06 - Kiểm Thử Phần Mềm (33 Tests, Coverage 88.3% ≥ 70%)'}
              {activeLab === 'new-lab' && 'Hướng dẫn thêm các bài thực hành tiếp theo'}
            </strong>
          </div>
          <div>
            Thư mục mã nguồn: <code>src/{activeLab === 'new-lab' ? 'th07...' : activeLab}/</code>
          </div>
        </div>

        {/* Render bài thực hành tương ứng */}
        {activeLab === 'th01' && <TH01App />}
        {activeLab === 'th02' && <TH02App />}
        {activeLab === 'th03' && <TH03App />}
        {activeLab === 'th04' && <TH04App />}
        {activeLab === 'th05' && <TH05App />}
        {activeLab === 'th06' && <TH06App />}

        {/* Hướng dẫn mở rộng bài thực hành mới */}
        {activeLab === 'new-lab' && (
          <div className="master-extensible-card">
            <div className="extensible-icon-box">
              <FolderPlus size={32} />
            </div>
            <h2 className="extensible-title">Kiến Trúc Mở Rộng Cho Các Bài Sau</h2>
            <p className="extensible-desc">
              Tất cả các thư viện cần thiết (React 19, Redux Toolkit, Zustand, Lucide icons, Vite, TypeScript) đã được cài đặt <strong>một lần duy nhất tại thư mục gốc</strong>. Đối với các bài thực hành tiếp theo (TH06, TH07...), bạn không cần cài lại package!
            </p>

            <div className="extensible-steps">
              <div>
                <strong>Bước 1:</strong> Tạo thư mục mới trong <code>src/</code> (Ví dụ: <code>src/th06/</code>).
              </div>
              <div>
                <strong>Bước 2:</strong> Viết các component cho bài mới bên trong <code>src/th06/</code>.
              </div>
              <div>
                <strong>Bước 3:</strong> Import và thêm một Tab tương ứng vào file <code>src/App.tsx</code>.
              </div>
              <div className="text-emerald-700 font-semibold flex items-center gap-1">
                <ArrowRight size={16} /> Ngay lập tức bài mới sẽ chạy trực tiếp mà không cần cài thêm npm packages hay tạo project Vite mới!
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
