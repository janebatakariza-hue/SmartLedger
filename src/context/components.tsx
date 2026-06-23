import { Text, View } from "react-native";
import {
  BLACK,
  GRAY_DARK,
  GRAY_MID,
  SEED_WEEKLY_REVENUE,
  SEED_WEEK_LABELS,
  WHITE,
} from "./theme";

export const Toast = ({
  msg,
  bottomOffset = 120,
}: {
  msg: string;
  bottomOffset?: number;
}) => {
  if (!msg) return null;
  return (
    <View
      style={{
        position: "absolute",
        bottom: bottomOffset,
        left: 20,
        right: 20,
        backgroundColor: BLACK,
        borderRadius: 10,
        paddingVertical: 14,
        paddingHorizontal: 20,
        alignItems: "center",
        zIndex: 9999,
        shadowColor: BLACK,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 10,
      }}
    >
      <Text
        style={{
          color: WHITE,
          fontSize: 14,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        {msg}
      </Text>
    </View>
  );
};

export const ProgressRing = ({
  score = 72,
  size = 180,
  strokeWidth = 16,
}: {
  score?: number;
  size?: number;
  strokeWidth?: number;
}) => {
  const deg = (score / 100) * 360;
  const half = size / 2;
  const innerSize = size - strokeWidth * 2;
  const firstHalfDeg = Math.min(deg, 180);
  const secondHalfDeg = Math.max(deg - 180, 0);

  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          position: "absolute",
          width: size,
          height: size,
          borderRadius: half,
          borderWidth: strokeWidth,
          borderColor: GRAY_MID,
        }}
      />
      {deg > 0 && (
        <View
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: half,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              position: "absolute",
              width: half,
              height: size,
              overflow: "hidden",
              left: half,
              top: 0,
            }}
          >
            <View
              style={{
                position: "absolute",
                width: size,
                height: size,
                borderRadius: half,
                borderWidth: strokeWidth,
                borderColor: BLACK,
                left: -half,
                top: 0,
                transform: [{ rotate: `${firstHalfDeg}deg` }],
              }}
            />
          </View>
          {deg > 180 && (
            <View
              style={{
                position: "absolute",
                width: half,
                height: size,
                overflow: "hidden",
                left: 0,
                top: 0,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  width: size,
                  height: size,
                  borderRadius: half,
                  borderWidth: strokeWidth,
                  borderColor: BLACK,
                  left: 0,
                  top: 0,
                  transform: [{ rotate: `${180 + secondHalfDeg}deg` }],
                }}
              />
            </View>
          )}
        </View>
      )}
      <View
        style={{
          width: innerSize,
          height: innerSize,
          borderRadius: innerSize / 2,
          backgroundColor: WHITE,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 42,
            fontWeight: "900",
            color: BLACK,
            letterSpacing: -2,
          }}
        >
          {score}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: GRAY_DARK,
            fontWeight: "500",
            marginTop: -4,
          }}
        >
          / 100
        </Text>
      </View>
    </View>
  );
};

export const BarChart = ({
  data = SEED_WEEKLY_REVENUE,
  labels = SEED_WEEK_LABELS,
}: {
  data?: number[];
  labels?: string[];
}) => {
  const maxVal = Math.max(...data);
  const chartHeight = 80;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-end",
        height: chartHeight + 24,
        paddingTop: 8,
      }}
    >
      {data.map((val, idx) => {
        const barH = Math.round((val / maxVal) * chartHeight);
        const isToday = idx === data.length - 1;
        return (
          <View
            key={idx}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                width: "60%",
                height: barH,
                backgroundColor: isToday ? BLACK : GRAY_MID,
                borderRadius: 3,
              }}
            />
            <Text
              style={{
                fontSize: 9,
                color: isToday ? BLACK : GRAY_DARK,
                marginTop: 4,
                fontWeight: isToday ? "700" : "400",
              }}
            >
              {labels[idx]}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
