import { useState, useEffect } from 'react';
import { TH01App } from './btvn1/TH01App';
import { TH02App } from './btvn2/TH02App';
import { TH03App } from './btvn3';
import { TH04App } from './btvn4/TH04App';
import { TH05App } from './btvn5/TH05App';
import { TH06App } from './btvn6/TH06App';
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

type ActiveLab = 'btvn1' | 'btvn2' | 'btvn3' | 'btvn4' | 'btvn5' | 'btvn6' | 'new-lab';

export default function App() {
  const [activeLab, setActiveLab] = useState<ActiveLab>(() => {
    const saved = localStorage.getItem('webnc_active_lab');
    if (saved && ['btvn1', 'btvn2', 'btvn3', 'btvn4', 'btvn5', 'btvn6', 'new-lab'].includes(saved)) {
      return saved as ActiveLab;
    }
    // Backward compatibility with previous stored keys
    if (saved === 'th01') return 'btvn1';
    if (saved === 'th02') return 'btvn2';
    if (saved === 'th03') return 'btvn3';
    if (saved === 'th04') return 'btvn4';
    if (saved === 'th05') return 'btvn5';
    if (saved === 'th06') return 'btvn6';
    return 'btvn6'; // Mặc định hiển thị bài mới nhất (BTVN 6)
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
              className={`master-tab-btn ${activeLab === 'btvn1' ? 'active' : ''}`}
              onClick={() => setActiveLab('btvn1')}
            >
              <FileCode size={16} />
              <span>BTVN 1: TypeScript</span>
              <span className="master-tab-badge">Tuần 1</span>
            </button>

            <button
              type="button"
              className={`master-tab-btn ${activeLab === 'btvn2' ? 'active' : ''}`}
              onClick={() => setActiveLab('btvn2')}
            >
              <BookOpen size={16} />
              <span>BTVN 2: Design Patterns</span>
              <span className="master-tab-badge">Tuần 2</span>
            </button>

            <button
              type="button"
              className={`master-tab-btn ${activeLab === 'btvn3' ? 'active' : ''}`}
              onClick={() => setActiveLab('btvn3')}
            >
              <ShoppingCart size={16} />
              <span>BTVN 3: Redux Toolkit</span>
              <span className="master-tab-badge badge-bonus">Tuần 3</span>
            </button>

            <button
              type="button"
              className={`master-tab-btn ${activeLab === 'btvn4' ? 'active' : ''}`}
              onClick={() => setActiveLab('btvn4')}
            >
              <Heart size={16} className={activeLab === 'btvn4' ? 'fill-current' : ''} />
              <span>BTVN 4: Zustand</span>
              <span className="master-tab-badge badge-rose">Tuần 4</span>
            </button>

            <button
              type="button"
              className={`master-tab-btn ${activeLab === 'btvn5' ? 'active' : ''}`}
              onClick={() => setActiveLab('btvn5')}
            >
              <Zap size={16} className={activeLab === 'btvn5' ? 'text-amber-300' : ''} />
              <span>BTVN 5: Tối Ưu React</span>
              <span className="master-tab-badge badge-emerald">Tuần 5 ⚡</span>
            </button>

            <button
              type="button"
              className={`master-tab-btn ${activeLab === 'btvn6' ? 'active' : ''}`}
              onClick={() => setActiveLab('btvn6')}
            >
              <FlaskConical size={16} className={activeLab === 'btvn6' ? 'text-indigo-300' : ''} />
              <span>BTVN 6: Kiểm Thử Phần Mềm</span>
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
            <span>Đang xem bài tập về nhà:</span>
            <strong>
              {activeLab === 'btvn1' && 'BTVN 1 - TypeScript & OOP Order Management'}
              {activeLab === 'btvn2' && 'BTVN 2 - React Compound Accordion & usePagination<T>'}
              {activeLab === 'btvn3' && 'BTVN 3 - Redux Toolkit Cart Module & RTK Query'}
              {activeLab === 'btvn4' && 'BTVN 4 - Zustand Favorites Store & So sánh RTK'}
              {activeLab === 'btvn5' && 'BTVN 5 - Tối Ưu React (10.000 SP): Virtualization & Lighthouse 98/100'}
              {activeLab === 'btvn6' && 'BTVN 6 - Kiểm Thử Phần Mềm (33 Tests, Coverage 88.3% ≥ 70%)'}
              {activeLab === 'new-lab' && 'Hướng dẫn thêm các bài thực hành tiếp theo'}
            </strong>
          </div>
          <div>
            Thư mục mã nguồn: <code>src/{activeLab === 'new-lab' ? 'btvn7...' : activeLab}/</code>
          </div>
        </div>

        {/* Render bài thực hành tương ứng */}
        {activeLab === 'btvn1' && <TH01App />}
        {activeLab === 'btvn2' && <TH02App />}
        {activeLab === 'btvn3' && <TH03App />}
        {activeLab === 'btvn4' && <TH04App />}
        {activeLab === 'btvn5' && <TH05App />}
        {activeLab === 'btvn6' && <TH06App />}

        {/* Hướng dẫn mở rộng bài thực hành mới */}
        {activeLab === 'new-lab' && (
          <div className="master-extensible-card">
            <div className="extensible-icon-box">
              <FolderPlus size={32} />
            </div>
            <h2 className="extensible-title">Kiến Trúc Mở Rộng Cho Các Bài Sau</h2>
            <p className="extensible-desc">
              Tất cả các thư viện cần thiết (React 19, Redux Toolkit, Zustand, Lucide icons, Vite, TypeScript) đã được cài đặt <strong>một lần duy nhất tại thư mục gốc</strong>. Đối với các bài thực hành tiếp theo (BTVN 7, BTVN 8...), bạn không cần cài lại package!
            </p>

            <div className="extensible-steps">
              <div>
                <strong>Bước 1:</strong> Tạo thư mục mới trong <code>src/</code> (Ví dụ: <code>src/btvn7/</code>).
              </div>
              <div>
                <strong>Bước 2:</strong> Viết các component cho bài mới bên trong <code>src/btvn7/</code>.
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
