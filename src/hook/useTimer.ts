import { useEffect, useState } from "react";

const useTimer = (unixTimestampMs: number | undefined): boolean => {
  const [shouldRender, setShouldRender] = useState<boolean>(false);

  useEffect(() => {
    // unixTimestamp가 undefined인 경우 early return
    if (typeof unixTimestampMs === "undefined") {
      setShouldRender(false);
      return;
    }

    // 밀리초를 초 단위로 변환
    const targetTimeSeconds = Math.floor(unixTimestampMs / 1000);

    const checkTime = () => {
      const currentTimeSeconds = Math.floor(Date.now() / 1000);
      if (currentTimeSeconds >= targetTimeSeconds) {
        setShouldRender(true);
        return true;
      }
      return false;
    };

    // 초기 체크
    const isTimeReached = checkTime();

    // 이미 시간이 지났다면 인터벌 설정하지 않음
    if (isTimeReached) {
      return;
    }

    // 1초마다 시간 체크
    const intervalId = setInterval(() => {
      const isTimeReached = checkTime();
      if (isTimeReached) {
        clearInterval(intervalId);
      }
    }, 1000);

    // 클린업
    return () => {
      clearInterval(intervalId);
    };
  }, [unixTimestampMs]);

  return shouldRender;
};

export default useTimer;
