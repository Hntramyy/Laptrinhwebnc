import { ImageResponse } from 'next/og';
import { getProductById } from '@/lib/products-data';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProductById(id);

  const title = product?.title || 'Chi Tiết Sản Phẩm';
  const price = product ? `${product.price.toLocaleString('vi-VN')} ₫` : 'Liên hệ';
  const category = product?.category || 'Công nghệ';
  const available = product ? product.stock > 0 : false;

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
          background: 'linear-gradient(135deg, #090d16 0%, #1e1b4b 60%, #312e81 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: '#4f46e5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
              }}
            >
              ⚡
            </div>
            <span style={{ fontSize: '24px', fontWeight: '800' }}>TechStore Vietnam</span>
          </div>

          <div
            style={{
              display: 'flex',
              padding: '8px 20px',
              borderRadius: '9999px',
              background: available ? '#059669' : '#dc2626',
              fontSize: '18px',
              fontWeight: '700',
            }}
          >
            {available ? `Còn ${product?.stock} sản phẩm` : 'Tạm hết hàng'}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              display: 'flex',
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.15)',
              fontSize: '16px',
              fontWeight: '600',
              color: '#38bdf8',
              alignSelf: 'flex-start',
            }}
          >
            {category} • Giá: {price}
          </div>

          <h1
            style={{
              fontSize: '52px',
              fontWeight: '900',
              lineHeight: 1.2,
              margin: 0,
              maxWidth: '1000px',
            }}
          >
            {title}
          </h1>

          <div style={{ fontSize: '32px', color: '#818cf8', fontWeight: '800' }}>
            {price}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            paddingTop: '20px',
            fontSize: '18px',
            color: '#94a3b8',
          }}
        >
          <span>Mua sắm thiết bị công nghệ chính hãng - Bảo hành 12 tháng</span>
          <span style={{ color: '#818cf8', fontWeight: '700' }}>techstore.vn</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}