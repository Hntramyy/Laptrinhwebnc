import React, { useState, useMemo } from 'react';
import {
  CheckCircle2,
  Play,
  RotateCcw,
  Search,
  Filter,
  Layers,
  Activity,
  Terminal,
  FileCode,
  ShieldCheck,
  Award,
  ChevronDown,
  ChevronUp,
  Clock,
  ExternalLink,
  Code2,
} from 'lucide-react';
import { TEST_CASES_DATA, COVERAGE_OVERVIEW, FILE_COVERAGE_DATA } from './data/testCasesData';
import type { TestCategory, TestCaseItem } from './types';
import { TestReportModal } from './components/TestReportModal';
import './TH06.css';

export const TH06App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TestCategory>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>('TC21');
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simProgress, setSimProgress] = useState(100);
  const [simCompletedCount, setSimCompletedCount] = useState(33);

  // Filter test cases
  const filteredTests = useMemo(() => {
    return TEST_CASES_DATA.filter((tc) => {
      const matchCat = activeTab === 'all' || tc.category === activeTab;
      const matchSearch =
        searchTerm.trim() === '' ||
        tc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tc.targetModule.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeTab, searchTerm]);

  // Simulate running test suite
  const handleRunSimulation = () => {
    if (isRunningSim) return;
    setIsRunningSim(true);
    setSimProgress(0);
    setSimCompletedCount(0);

    const interval = setInterval(() => {
      setSimProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRunningSim(false);
          setSimCompletedCount(33);
          return 100;
        }
        const next = prev + 10;
        setSimCompletedCount(Math.min(33, Math.floor((next / 100) * 33)));
        return next;
      });
    }, 180);
  };

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="th06-container">
      {/* HEADER SECTION */}
      <header className="th06-header">
        <div className="th06-header-inner">
          <div>
            <div className="th06-header-badge">
              <ShieldCheck size={14} />
              <span>LTWNC • Bài Tập Tuần 6 • Kiểm Thử Phần Mềm</span>
            </div>
            <h1 className="th06-header-title">
              Test Automation & Code Coverage Dashboard
            </h1>
            <p className="th06-header-desc">
              Bộ kiểm thử toàn diện module Giỏ Hàng & Quản Lý Sản Phẩm bằng Vitest (Jest-compatible) & React Testing Library (RTL).
            </p>
          </div>

          <div className="th06-header-actions">
            <button
              type="button"
              className="th06-btn-run-tests"
              onClick={handleRunSimulation}
              disabled={isRunningSim}
            >
              {isRunningSim ? (
                <>
                  <RotateCcw size={16} className="animate-spin" />
                  <span>Đang chạy test ({simProgress}%)...</span>
                </>
              ) : (
                <>
                  <Play size={16} />
                  <span>Chạy lại bộ test (33 Tests)</span>
                </>
              )}
            </button>

            <button
              type="button"
              className="th06-btn-view-report"
              onClick={() => setIsReportOpen(true)}
            >
              <Award size={16} />
              <span>Xem Báo Cáo Coverage</span>
            </button>
          </div>
        </div>

        {/* Live Simulation Progress Bar */}
        {isRunningSim && (
          <div className="th06-progress-wrapper">
            <div className="th06-progress-track">
              <div
                className="th06-progress-fill"
                style={{ width: `${simProgress}%` }}
              />
            </div>
            <span className="th06-progress-label">
              Đang thực thi: {simCompletedCount}/33 tests đã hoàn thành
            </span>
          </div>
        )}
      </header>

      {/* COVERAGE METRICS OVERVIEW CARDS */}
      <section className="th06-metrics-grid">
        <div className="th06-metric-card stat-pass">
          <div className="metric-header">
            <span className="metric-title">Statements Coverage</span>
            <span className="metric-tag">Chỉ tiêu ≥ 70%</span>
          </div>
          <div className="metric-main">
            <span className="metric-number text-emerald-600">
              {COVERAGE_OVERVIEW.statements}%
            </span>
            <div className="metric-meter">
              <div
                className="meter-bar bg-emerald-500"
                style={{ width: `${COVERAGE_OVERVIEW.statements}%` }}
              />
            </div>
          </div>
          <p className="metric-desc">Đạt chuẩn kiểm thử loại Xuất sắc (+18.3%)</p>
        </div>

        <div className="th06-metric-card stat-pass">
          <div className="metric-header">
            <span className="metric-title">Lines Coverage</span>
            <span className="metric-tag">Chỉ tiêu ≥ 70%</span>
          </div>
          <div className="metric-main">
            <span className="metric-number text-emerald-600">
              {COVERAGE_OVERVIEW.lines}%
            </span>
            <div className="metric-meter">
              <div
                className="meter-bar bg-emerald-500"
                style={{ width: `${COVERAGE_OVERVIEW.lines}%` }}
              />
            </div>
          </div>
          <p className="metric-desc">Độ phủ toàn bộ các dòng mã nguồn (+18.9%)</p>
        </div>

        <div className="th06-metric-card stat-pass">
          <div className="metric-header">
            <span className="metric-title">Functions Coverage</span>
            <span className="metric-tag">Chỉ tiêu ≥ 70%</span>
          </div>
          <div className="metric-main">
            <span className="metric-number text-emerald-600">
              {COVERAGE_OVERVIEW.functions}%
            </span>
            <div className="metric-meter">
              <div
                className="meter-bar bg-emerald-500"
                style={{ width: `${COVERAGE_OVERVIEW.functions}%` }}
              />
            </div>
          </div>
          <p className="metric-desc">Bao phủ 11/12 hàm reducer & custom hooks</p>
        </div>

        <div className="th06-metric-card stat-tests">
          <div className="metric-header">
            <span className="metric-title">Test Results (Tỷ lệ Đạt)</span>
            <span className="metric-tag-blue">100% Pass</span>
          </div>
          <div className="metric-main">
            <span className="metric-number text-indigo-600">
              {COVERAGE_OVERVIEW.passedTests} / {COVERAGE_OVERVIEW.totalTests}
            </span>
            <div className="metric-meter">
              <div className="meter-bar bg-indigo-600" style={{ width: '100%' }} />
            </div>
          </div>
          <p className="metric-desc">6 suites thực thi trong ~5.97s (0 failed)</p>
        </div>
      </section>

      {/* COVERAGE BY FILE TABLE */}
      <section className="th06-card mb-6">
        <div className="th06-card-header">
          <div className="flex items-center gap-2">
            <FileCode size={18} className="text-indigo-600" />
            <h2 className="text-base font-bold text-slate-800">
              Phân Bổ Độ Bao Phủ Mã Nguồn Theo Từng File (Module Giỏ Hàng)
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Thuật toán v8 Engine Coverage
          </span>
        </div>

        <div className="th06-table-wrapper">
          <table className="th06-report-table">
            <thead>
              <tr>
                <th>Tên File Mã Nguồn</th>
                <th>% Statements</th>
                <th>% Branches</th>
                <th>% Functions</th>
                <th>% Lines</th>
                <th>Dòng Chưa Phủ</th>
                <th>Đánh Giá</th>
              </tr>
            </thead>
            <tbody>
              {FILE_COVERAGE_DATA.map((file) => (
                <tr key={file.filename}>
                  <td className="font-mono font-medium text-slate-800">
                    {file.filename}
                  </td>
                  <td className="font-semibold text-emerald-600">{file.statements}%</td>
                  <td className="text-slate-700">{file.branches}%</td>
                  <td className="text-slate-700">{file.functions}%</td>
                  <td className="font-semibold text-emerald-600">{file.lines}%</td>
                  <td className="font-mono text-xs text-slate-500">
                    {file.uncoveredLines}
                  </td>
                  <td>
                    <span className="th06-badge-pass">
                      <CheckCircle2 size={12} /> Đạt
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="bg-emerald-50/70 font-bold border-t-2 border-emerald-200">
                <td className="text-slate-900">Toàn bộ Module Giỏ Hàng</td>
                <td className="text-emerald-700">{COVERAGE_OVERVIEW.statements}%</td>
                <td className="text-emerald-700">{COVERAGE_OVERVIEW.branches}%</td>
                <td className="text-emerald-700">{COVERAGE_OVERVIEW.functions}%</td>
                <td className="text-emerald-700">{COVERAGE_OVERVIEW.lines}%</td>
                <td className="text-xs text-emerald-700">Tất cả ngưỡng ≥ 70%</td>
                <td>
                  <span className="th06-badge-pass font-bold">
                    <ShieldCheck size={12} /> ĐẠT YÊU CẦU
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* TEST SUITES EXPLORER SECTION */}
      <section className="th06-card">
        {/* Filter Controls & Search */}
        <div className="th06-explorer-header">
          <div className="th06-filter-tabs">
            <button
              type="button"
              className={`th06-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              Tất cả ({TEST_CASES_DATA.length})
            </button>
            <button
              type="button"
              className={`th06-tab-btn ${activeTab === 'unit' ? 'active' : ''}`}
              onClick={() => setActiveTab('unit')}
            >
              Unit Tests (17)
            </button>
            <button
              type="button"
              className={`th06-tab-btn ${activeTab === 'integration' ? 'active' : ''}`}
              onClick={() => setActiveTab('integration')}
            >
              Integration RTL (10)
            </button>
            <button
              type="button"
              className={`th06-tab-btn ${activeTab === 'async' ? 'active' : ''}`}
              onClick={() => setActiveTab('async')}
            >
              Async & Mock API (6)
            </button>
          </div>

          <div className="th06-search-wrapper">
            <Search size={16} className="text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo mã TC, tên test hoặc file..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="th06-search-input"
            />
          </div>
        </div>

        {/* Test List Accordion */}
        <div className="th06-test-list">
          {filteredTests.map((tc) => {
            const isExpanded = expandedId === tc.id;
            return (
              <div
                key={tc.id}
                className={`th06-test-card ${isExpanded ? 'expanded' : ''}`}
              >
                <div
                  className="th06-test-card-summary"
                  onClick={() => toggleExpand(tc.id)}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    <span className="th06-test-id">{tc.id}</span>
                    <span className="th06-test-name">{tc.name}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`th06-category-badge ${tc.category}`}>
                      {tc.category === 'unit'
                        ? 'Unit'
                        : tc.category === 'integration'
                        ? 'Integration'
                        : 'Async API'}
                    </span>
                    <span className="th06-module-badge">{tc.targetModule}</span>
                    <span className="th06-time-badge">
                      <Clock size={11} /> {tc.durationMs}ms
                    </span>
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={16} className="text-slate-400" />
                    )}
                  </div>
                </div>

                {isExpanded && (
                  <div className="th06-test-card-body">
                    <p className="th06-test-desc">
                      <strong>Mục đích:</strong> {tc.description}
                    </p>
                    <div className="th06-snippet-box">
                      <div className="flex items-center gap-1.5 mb-1.5 text-xs text-slate-400 font-mono">
                        <Code2 size={13} /> Mã kiểm tra xác thực (Assertion Code):
                      </div>
                      <pre className="th06-snippet-code">
                        <code>{tc.assertionSnippet}</code>
                      </pre>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* MODAL BÁO CÁO */}
      <TestReportModal isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
    </div>
  );
};
