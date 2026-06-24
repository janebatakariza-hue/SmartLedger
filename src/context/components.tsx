import React from "react";
import { View, Text } from "react-native";
import { LineChart, BarChart as GiftedBarChart } from "react-native-gifted-charts";
import { BLACK, WHITE, GRAY_MID, GRAY_DARK } from "./theme";
import { SEED_WEEKLY_REVENUE, SEED_WEEK_LABELS } from "./seed";

export const Toast = ({ msg, bottomOffset = 120 }: { msg: string; bottomOffset?: number }) => {
  if (!msg) return null;
  return (
    <View style={{ position: "absolute", bottom: bottomOffset, left: 20, right: 20, backgroundColor: BLACK, borderRadius: 10, paddingVertical: 14, paddingHorizontal: 20, alignItems: "center", zIndex: 9999, elevation: 10 }}>
      <Text style={{ color: WHITE, fontSize: 14, fontWeight: "600", textAlign: "center" }}>{msg}</Text>
    </View>
  );
};

export const ProgressRing = ({ score = 72, size = 180, strokeWidth = 16 }: { score?: number; size?: number; strokeWidth?: number }) => {
  const deg = (score / 100) * 360;
  const half = size / 2;
  const innerSize = size - strokeWidth * 2;
  const firstHalfDeg = Math.min(deg, 180);
  const secondHalfDeg = Math.max(deg - 180, 0);
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <View style={{ position: "absolute", width: size, height: size, borderRadius: half, borderWidth: strokeWidth, borderColor: GRAY_MID }} />
      {deg > 0 && (
        <View style={{ position: "absolute", width: size, height: size, borderRadius: half, overflow: "hidden" }}>
          <View style={{ position: "absolute", width: half, height: size, overflow: "hidden", left: half, top: 0 }}>
            <View style={{ position: "absolute", width: size, height: size, borderRadius: half, borderWidth: strokeWidth, borderColor: BLACK, left: -half, top: 0, transform: [{ rotate: `${firstHalfDeg}deg` }] }} />
          </View>
          {deg > 180 && (
            <View style={{ position: "absolute", width: half, height: size, overflow: "hidden", left: 0, top: 0 }}>
              <View style={{ position: "absolute", width: size, height: size, borderRadius: half, borderWidth: strokeWidth, borderColor: BLACK, left: 0, top: 0, transform: [{ rotate: `${180 + secondHalfDeg}deg` }] }} />
            </View>
          )}
        </View>
      )}
      <View style={{ width: innerSize, height: innerSize, borderRadius: innerSize / 2, backgroundColor: WHITE, alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 42, fontWeight: "900", color: BLACK, letterSpacing: -2 }}>{score}</Text>
        <Text style={{ fontSize: 12, color: GRAY_DARK, fontWeight: "500", marginTop: -4 }}>/ 100</Text>
      </View>
    </View>
  );
};

export const WeeklyBarChart = ({ data = SEED_WEEKLY_REVENUE, labels = SEED_WEEK_LABELS, height = 120 }: { data?: number[]; labels?: string[]; height?: number }) => {
  const maxVal = Math.max(...data);
  const barData = data.map((value, index) => ({
    value,
    label: labels[index],
    frontColor: index === data.length - 1 ? BLACK : GRAY_MID,
    topLabelComponent: index === data.length - 1
      ? () => <Text style={{ fontSize: 8, color: BLACK, fontWeight: "700", marginBottom: 2 }}>{(value / 1000).toFixed(0)}k</Text>
      : undefined,
  }));
  return (
    <View style={{ marginTop: 8 }}>
      <GiftedBarChart
        data={barData}
        barWidth={28}
        spacing={12}
        roundedTop
        hideRules
        hideAxesAndRules
        maxValue={maxVal * 1.2}
        height={height}
        yAxisThickness={0}
        xAxisThickness={0}
        xAxisLabelTextStyle={{ fontSize: 9, color: GRAY_DARK }}
        isAnimated
      />
    </View>
  );
};

export const RevenueLineChart = ({ data = SEED_WEEKLY_REVENUE, labels = SEED_WEEK_LABELS, height = 120, color = BLACK }: { data?: number[]; labels?: string[]; height?: number; color?: string }) => {
  const lineData = data.map((value, index) => ({ value, label: labels[index] }));
  return (
    <View style={{ marginTop: 8 }}>
      <LineChart
        data={lineData}
        height={height}
        spacing={42}
        initialSpacing={16}
        color={color}
        thickness={2.5}
        startFillColor={color}
        endFillColor={WHITE}
        startOpacity={0.15}
        endOpacity={0.01}
        areaChart
        curved
        hideRules
        hideAxesAndRules
        yAxisThickness={0}
        xAxisThickness={0}
        dataPointsColor={color}
        dataPointsRadius={4}
        xAxisLabelTextStyle={{ fontSize: 9, color: GRAY_DARK }}
        isAnimated
        animationDuration={800}
      />
    </View>
  );
};

export const MiniBarChart = ({ data, activeIndex }: { data: number[]; activeIndex: number }) => {
  const maxVal = Math.max(...data);
  const barData = data.map((value, index) => ({
    value,
    frontColor: index === activeIndex ? BLACK : GRAY_MID,
  }));
  return (
    <GiftedBarChart
      data={barData}
      barWidth={20}
      spacing={8}
      roundedTop
      hideRules
      hideAxesAndRules
      maxValue={maxVal * 1.2}
      height={60}
      yAxisThickness={0}
      xAxisThickness={0}
      isAnimated
    />
  );
};

export const ExpenseBarChart = ({ data, labels, height = 100 }: { data: number[]; labels: string[]; height?: number }) => {
  const maxVal = Math.max(...data);
  const barData = data.map((value, index) => ({
    value,
    label: labels[index],
    frontColor: index === data.length - 1 ? BLACK : GRAY_MID,
  }));
  return (
    <GiftedBarChart
      data={barData}
      barWidth={24}
      spacing={10}
      roundedTop
      hideRules
      hideAxesAndRules
      maxValue={maxVal * 1.2}
      height={height}
      yAxisThickness={0}
      xAxisThickness={0}
      xAxisLabelTextStyle={{ fontSize: 9, color: GRAY_DARK }}
      isAnimated
    />
  );
};