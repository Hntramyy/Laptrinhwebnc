import { ImageResponse } from 'next/og';

export const alt = 'TechStore - Thiết Bị & Phụ Kiện Công Nghệ Chính Hãng';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 50%, #312e81 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: '#4f46e5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              fontWeight: 'bold',
            }}
          >
            ⚡
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-0.5px' }}>
              TechStore Vietnam
            </span>
            <span style={{ fontSize: '18px', color: '#a5b4fc' }}>
              Phân Phối Thiết Bị Công Nghệ Cao Cấp
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              padding: '8px 16px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.15)',
              fontSize: '18px',
              fontWeight: '600',
              color: '#38bdf8',
              alignSelf: 'flex-start',
            }}
          >
            Hệ Thống Mua Sắm Trực Tuyến Thế Hệ Mới
          </div>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: '900',
              lineHeight: 1.15,
              margin: 0,
              maxWidth: '900px',
            }}
          >
            Bàn Phím Cơ, Chuột Công Thái Học & Phụ Kiện
          </h1>
          <p style={{ fontSize: '22px', color: '#cbd5e1', margin: 0, maxWidth: '800px' }}>
            Sản phẩm chính hãng NuPhy, Logitech, Sony, Dell, Garmin với chính sách bảo hành 1 đổi 1.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', gap: '32px' }}>
            <span style={{ fontSize: '18px', color: '#e2e8f0' }}>⚡ Giao hàng siêu tốc</span>
            <span style={{ fontSize: '18px', color: '#e2e8f0' }}>🔒 Bảo mật NextAuth RBAC</span>
            <span style={{ fontSize: '18px', color: '#e2e8f0' }}>🌐 Chuẩn SEO & OpenGraph</span>
          </div>
          <span style={{ fontSize: '20px', fontWeight: '700', color: '#818cf8' }}>
            techstore.vn
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}