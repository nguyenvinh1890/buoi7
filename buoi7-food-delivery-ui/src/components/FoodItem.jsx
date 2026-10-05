// src/components/FoodItem.jsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export const FoodItem = React.memo(({ item, onPress, onAddToCart }) => {
  // Hàm format tiền tệ Việt Nam (VD: 65.000 ₫)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      activeOpacity={0.85}
      onPress={() => onPress && onPress(item)}
    >
      {/* 1. Phần ảnh món ăn & Badge giảm giá */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.imageUrl }}
          style={styles.foodImage}
          resizeMode="cover"
        />
        {item.discountBadge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.discountBadge}</Text>
          </View>
        )}
      </View>

      {/* 2. Phần thông tin chi tiết món ăn */}
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.foodName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.foodDesc} numberOfLines={2}>
            {item.description}
          </Text>
        </View>

        {/* Thông tin phụ: Đánh giá, Thời gian giao, Khoảng cách */}
        <View style={styles.metaRow}>
          <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          <Text style={styles.dotSeparator}>•</Text>
          <Text style={styles.metaText}>{item.deliveryTime}</Text>
          <Text style={styles.dotSeparator}>•</Text>
          <Text style={styles.metaText}>{item.distance}</Text>
        </View>

        {/* Giá tiền & Nút thêm món */}
        <View style={styles.bottomRow}>
          <View style={styles.priceGroup}>
            <Text style={styles.currentPrice}>{formatPrice(item.price)}</Text>
            {item.originalPrice && (
              <Text style={styles.originalPrice}>
                {formatPrice(item.originalPrice)}
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.8}
            onPress={() => onAddToCart && onAddToCart(item)}
          >
            <Text style={styles.addButtonText}>+ Thêm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
});

FoodItem.displayName = 'FoodItem';

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    // Đổ bóng cho iOS
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    // Đổ bóng cho Android
    elevation: 2,
  },
  imageContainer: {
    width: 105,
    height: 105,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#F8FAFC',
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#EF4444',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  foodName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 3,
  },
  foodDesc: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#D97706',
  },
  dotSeparator: {
    marginHorizontal: 5,
    color: '#CBD5E1',
    fontSize: 12,
  },
  metaText: {
    fontSize: 12,
    color: '#64748B',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  priceGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  currentPrice: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EA580C', // Cam ẩm thực ấm áp
  },
  originalPrice: {
    fontSize: 11,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  addButton: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
});
