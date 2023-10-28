import RequestBoxCard from "./RequestBoxCard";

export default function RequestBox({
  id,
  username,
  status,
  profile_photo,
  sent,
  friend = false,
}: {
  id: number;
  username: string;
  status: number;
  profile_photo: string;
  sent: boolean;
  friend?: boolean;
}) {
  return (
    <div className="space-y-8 mt-4">
      <RequestBoxCard
        id={id}
        username={username}
        status={status}
        profile_photo={profile_photo}
        sent={sent}
        friend={friend}
      />
    </div>
  );
}
