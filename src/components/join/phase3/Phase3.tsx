import UserNickArea from "@/components/join/UserNickArea.tsx";
import useUserStore from "@/store/userStore.ts";

const Phase3 = () => {
  const { joinValid } = useUserStore();

  return (
    <div className={`phase ${joinValid.phase === 2 && "active"}`}>
      <UserNickArea />
    </div>
  );
};

export default Phase3;
