import React from 'react';
import { useFavoritesStore } from '../favoritesStore';
import { X, Heart, Trash2, ShoppingBag, ExternalLink } from 'lucide-react';
import type { FavoriteProduct } from '../favoritesTypes';

interface FavoriteDrawerProps {
  onSelectProduct: (product: FavoriteProduct) => void;
  onToast: (message: string, isAdded: boolean) => void;
}

export const FavoriteDrawer: React.FC<FavoriteDrawerProps> = ({
  onSelectProduct,
  onToast,
}) => {
  const favorites = useFavoritesStore((state) => state.favorites);
  const isOpen = useFavoritesStore((state) => state.isDrawerOpen);
  const setDrawerOpen = useFavoritesStore((state) => state.setDrawerOpen);
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  if (!isOpen) return null;

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(val);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  const handleRemove = (id: number, title: string) => {
    removeFavorite(id);
    onToast(`Đã xóa "${title}" khỏi danh sách yêu thích.`, false);
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả sản phẩm khỏi danh sách yêu thích?')) {
      clearFavorites();
      onToast('Đã xóa toàn bộ danh sách yêu thích.', false);
    }
  };

  return (
    <div className="th04-drawer-overlay" onClick={handleClose}>
      <aside
        className="th04-drawer-content"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="th04-drawer-header">
          <div className="flex items-center gap-2">
            <div className="th04-header-heart-icon">
              <Heart size={20} className="fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h2 className="th04-drawer-title">Sản Phẩm Yêu Thích</h2>
              <p className="th04-drawer-subtitle">
                Quản lý bởi <strong>Zustand favoritesStore</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {favorites.length > 0 && (
              <button
                type="button"
                className="th04-btn-clear-fav"
                onClick={handleClearAll}
                title="Xóa tất cả yêu thích"
              >
                <Trash2 size={15} /> Xóa hết
              </button>
            )}
            <button
              type="button"
              className="th04-drawer-close-btn"
              onClick={handleClose}
              title="Đóng danh sách"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="th04-drawer-body">
          {favorites.length === 0 ? (
            <div className="th04-empty-fav-view">
              <div className="th04-empty-icon-box">
                <Heart size={48} className="text-slate-300" />
              </div>
              <h3 className="th04-empty-title">Chưa có sản phẩm yêu thích</h3>
              <p className="th04-empty-desc">
                Nhấp vào biểu tượng trái tim trên bất kỳ sản phẩm nào để lưu lại danh sách yêu thích của bạn!
              </p>
              <button
                type="button"
                className="th04-btn-continue"
                onClick={handleClose}
              >
                Khám phá sản phẩm ngay
              </button>
            </div>
          ) : (
            <div className="th04-fav-items-list">
              <div className="th04-count-summary">
                <span>Hiện có <strong>{favorites.length}</strong> sản phẩm đã lưu:</span>
              </div>

              {favorites.map((product) => (
                <div key={product.id} className="th04-fav-item-row">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="th04-fav-item-img"
                    onClick={() => {
                      onSelectProduct(product);
                      handleClose();
                    }}
                  />

                  <div className="th04-fav-item-info">
                    <span className="th04-fav-item-cat">{product.category}</span>
                    <h4
                      className="th04-fav-item-title"
                      onClick={() => {
                        onSelectProduct(product);
                        handleClose();
                      }}
                      title={product.title}
                    >
                      {product.title}
                    </h4>

                    <div className="th04-fav-item-bottom">
                      <span className="th04-fav-item-price">
                        {formatCurrency(product.price)}
                      </span>

                      <button
                        type="button"
                        className="th04-btn-remove-item"
                        onClick={() => handleRemove(product.id, product.title)}
                        title="Bỏ khỏi yêu thích"
                      >
                        <Trash2 size={15} /> Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};
