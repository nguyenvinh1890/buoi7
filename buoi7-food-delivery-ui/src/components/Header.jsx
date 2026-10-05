// src/components/Header.jsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

export const Header = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  cartCount,
  onCartPress,
}) => {
  return (
    <View style={styles.headerContainer}>
      {/* 1. Thanh địa chỉ giao hàng & Giỏ hàng */}
      <View style={styles.topRow}>
        <View style={styles.locationGroup}>
          <Text style={styles.locationLabel}>GIAO ĐẾN ĐỊA CHỈ</Text>
          <TouchableOpacity style={styles.locationSelector} activeOpacity={0.7}>
            <Text style={styles.locationIcon}>📍</Text>
            <Text style={styles.locationAddress} numberOfLines={1}>
              123 Nguyễn Huệ, Phường Bến Nghé, Quận 1
            </Text>
            <Text style={styles.dropdownIcon}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* Nút Giỏ hàng có Badge số lượng */}
        <TouchableOpacity
          style={styles.cartButton}
          activeOpacity={0.7}
          onPress={onCartPress}
        >
          <Text style={styles.cartIcon}>🛒</Text>
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* 2. Thanh tìm kiếm (Search Bar) */}
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm món ngon, trà sữa, pizza..."
          placeholderTextColor="#94A3B8"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Text style={styles.clearIcon}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 3. Danh mục ẩm thực cuộn ngang (Horizontal Chips) */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryChip, isSelected && styles.categoryChipActive]}
              onPress={() => setSelectedCategory(cat.id)}
              activeOpacity={0.75}
            >
              <Text style={styles.categoryIcon}>{cat.icon}</Text>
              <Text
                style={[
                  styles.categoryName,
                  isSelected && styles.categoryNameActive,
                ]}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    // Đổ bóng cố định Header
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  locationGroup: {
    flex: 1,
    marginRight: 12,
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.5,
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  locationAddress: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
    flexShrink: 1,
  },
  dropdownIcon: {
    fontSize: 9,
    color: '#64748B',
    marginLeft: 4,
  },
  cartButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF7ED',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  cartIcon: {
    fontSize: 18,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EA580C',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 12,
  },
  searchIcon: {
    fontSize: 14,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 13.5,
    color: '#1E293B',
    paddingVertical: 0,
  },
  clearIcon: {
    fontSize: 14,
    color: '#94A3B8',
    padding: 4,
  },
  categoryList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  categoryChipActive: {
    backgroundColor: '#EA580C',
    borderColor: '#EA580C',
  },
  categoryIcon: {
    fontSize: 14,
  },
  categoryName: {
    fontSize: 12.5,
    fontWeight: '600',
    color: '#475569',
  },
  categoryNameActive: {
    color: '#FFFFFF',
  },
});
