import React from 'react';
import { TrendingUp, Users, BookOpen, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { monthlyData, adminStatsData } from '../../constants/adminData';

export function Analytics() {
  const growthData = monthlyData.map(item => ({
    ...item,
    userGrowth: ((item.users / 850 - 1) * 100).toFixed(1),
    revenueGrowth: ((item.revenue / 3200000 - 1) * 100).toFixed(1)
  }));

  return (
    <div className="space-y-8 animate-fade-in">
      <h2 className="text-2xl text-reading-accent">분석 및 통계</h2>

      {/* 성장률 지표 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="book-card p-6 text-center paper-texture">
          <TrendingUp className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-2xl price mb-1">+41.7%</div>
          <div className="text-sm text-reading-muted">사용자 증가율</div>
        </div>

        <div className="book-card p-6 text-center paper-texture">
          <BookOpen className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-2xl price mb-1">+20.9%</div>
          <div className="text-sm text-reading-muted">도서 추가율</div>
        </div>

        <div className="book-card p-6 text-center paper-texture">
          <DollarSign className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-2xl price mb-1">+40.6%</div>
          <div className="text-sm text-reading-muted">매출 증가율</div>
        </div>

        <div className="book-card p-6 text-center paper-texture">
          <Users className="w-8 h-8 text-accent mx-auto mb-3" />
          <div className="text-2xl price mb-1">27.4%</div>
          <div className="text-sm text-reading-muted">활성 사용자 비율</div>
        </div>
      </div>

      {/* 트렌드 차트 */}
      <div className="book-card p-6 paper-texture">
        <h3 className="text-xl text-reading-accent mb-6">월별 성장 트렌드</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="month" stroke="var(--reading-muted)" />
              <YAxis stroke="var(--reading-muted)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--card)', 
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="users" 
                stroke="var(--accent)" 
                strokeWidth={2}
                name="사용자"
              />
              <Line 
                type="monotone" 
                dataKey="books" 
                stroke="var(--primary)" 
                strokeWidth={2}
                name="도서"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 카테고리별 성과 */}
      <div className="book-card p-6 paper-texture">
        <h3 className="text-xl text-reading-accent mb-6">카테고리별 성과</h3>
        <div className="space-y-4">
          {adminStatsData.topCategories.map((category, index) => (
            <div key={category.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: ['#d4a574', '#c8956d', '#b8845a', '#a67c52', '#8b6914'][index] }} />
                <span className="text-reading-text">{category.name}</span>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-sm price">{category.count.toLocaleString()}권</div>
                  <div className="text-xs text-reading-muted">도서 수</div>
                </div>
                <div className="text-right">
                  <div className="text-sm price">{(category.revenue / 1000000).toFixed(1)}M원</div>
                  <div className="text-xs text-reading-muted">매출</div>
                </div>
                <div className="w-24 bg-muted rounded-full h-2">
                  <div 
                    className="reading-progress h-2 rounded-full"
                    style={{ width: `${(category.revenue / adminStatsData.topCategories[0].revenue) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}