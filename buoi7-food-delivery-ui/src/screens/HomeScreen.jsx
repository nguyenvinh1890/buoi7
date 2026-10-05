// src/screens/HomeScreen.jsx
import React, { useState, useMemo, useCallback } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Platform,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Header } from '../components/Header';
import { FoodItem } from '../components/FoodItem';
import { FOOD_ITEMS, CATEGORIES } from '../data/mockData';

export const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [foodList, setFoodList] = useState(FOOD_ITEMS);
  const [cartCount, setCartCount] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  // Lọc món ăn theo danh mục và từ khóa tìm kiếm
  const filteredFoods = useMemo(() => {
    return foodList.filter((item) => {
      const matchCategory =
        selectedCategory === 'all' || item.category === selectedCategory;
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [foodList, selectedCategory, searchQuery]);

  // Pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setFoodList(FOOD_ITEMS);
      setRefreshing(false);
    }, 1000);
  }, []);

  // Xử lý xem chi tiết món ăn
  const handleItemPress = useCallback((item) => {
    Alert.alert(item.name, `${item.description}\n\nGiá: ${item.price.toLocaleString('vi-VN')} ₫`);
  }, []);

  // Xử lý thêm vào giỏ hàng
  const handleAddToCart = useCallback((item) => {
    setCartCount((prev) => prev + 1);
    Alert.alert('Đã thêm món', `Đã thêm 1 "${item.name}" vào giỏ hàng.`);
  }, []);

  // Mở giỏ hàng
  const handleCartPress = useCallback(() => {
    Alert.alert('Giỏ hàng của bạn', `Hiện đang có ${cartCount} món ăn sẵn sàng thanh toán!`);
  }, [cartCount]);

  // ========================================================
  // KỸ THUẬT FLATLIST:
  // 1. keyExtractor: Định danh duy nhất, cam kết 100% không warning key
  // ========================================================
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  // ========================================================
  // 2. renderItem: Sử dụng component FoodItem đã tách riêng
  // ========================================================
  const renderFoodItem = useCallback(
    ({ item }) => (
      <FoodItem
        item={item}
        onPress={handleItemPress}
        onAddToCart={handleAddToCart}
      />
    ),
    [handleItemPress, handleAddToCart]
  );

  // Header của danh sách (Banner khuyến mãi + Tiêu đề section)
  const renderListHeader = () => (
    <View style={styles.listHeader}>
      {/* Banner khuyến mãi ẩm thực */}
      <View style={styles.bannerContainer}>
        <View style={styles.bannerTextGroup}>
          <Text style={styles.bannerTag}>⚡ FLASH SALE HÔM NAY</Text>
          <Text style={styles.bannerTitle}>Đồng Giá 39K & Freeship</Text>
          <Text style={styles.bannerSubtitle}>Áp dụng cho tất cả đơn hàng từ 10h - 14h</Text>
        </View>
        <TouchableOpacity style={styles.bannerButton} activeOpacity={0.8}>
          <Text style={styles.bannerButtonText}>Lấy Mã</Text>
        </TouchableOpacity>
      </View>

      {/* Tiêu đề phân mục */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Món Ngon Đề Xuất Cho Bạn</Text>
        <Text style={styles.itemCountText}>{filteredFoods.length} món</Text>
      </View>
    </View>
  );

  // Giao diện khi không có món ăn
  const renderListEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>🍽️</Text>
      <Text style={styles.emptyTitle}>Chưa tìm thấy món ăn phù hợp</Text>
      <Text style={styles.emptySubtitle}>
        Vui lòng thử gõ từ khóa khác hoặc chọn lại danh mục "Tất cả".
      </Text>
      <TouchableOpacity
        style={styles.resetButton}
        onPress={() => {
          setSearchQuery('');
          setSelectedCategory('all');
        }}
      >
        <Text style={styles.resetButtonText}>Xem toàn bộ thực đơn</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    // Bọc toàn bộ giao diện trong SafeAreaView tránh tai thỏ / status bar
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={Platform.OS === 'android'}
      />

      {/* HEADER CỐ ĐỊNH VỊ TRÍ: Nằm trên FlatList, không bị cuộn theo */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={CATEGORIES}
        cartCount={cartCount}
        onCartPress={handleCartPress}
      />

      {/* FLATLIST HIỂN THỊ DANH SÁCH MÓN ĂN */}
      <FlatList
        data={filteredFoods}
        keyExtractor={keyExtractor}
        renderItem={renderFoodItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={renderListHeader}
        ListEmptyComponent={renderListEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#EA580C']}
            tintColor="#EA580C"
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  listHeader: {
    paddingTop: 16,
    marginBottom: 4,
  },
  bannerContainer: {
    backgroundColor: '#7C2D12',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  bannerTextGroup: {
    flex: 1,
    paddingRight: 10,
  },
  bannerTag: {
    color: '#FED7AA',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  bannerSubtitle: {
    color: '#FDBA74',
    fontSize: 11,
  },
  bannerButton: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  bannerButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  itemCountText: {
    fontSize: 12.5,
    color: '#64748B',
    fontWeight: '600',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  resetButton: {
    backgroundColor: '#EA580C',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
