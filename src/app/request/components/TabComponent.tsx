import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RequestBox from "./RequestContainer";
import NoFriendComponent from "./NoFriendComponent";

export default async function TabComponent({
  recievedRequest,
  sentRequest,
}: {
  recievedRequest: any;
  sentRequest: any;
}) {
  return (
    <Tabs defaultValue="received" className="w-full">
      <div className="text-right">
        <TabsList className="w-fit">
          <TabsTrigger value="received">Recieved</TabsTrigger>
          <TabsTrigger value="send">Send</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="received">
        <div>
          {recievedRequest?.friendRequests?.length !== 0 ? (
            recievedRequest?.friendRequests?.map((item: any) => (
              <RequestBox
                key={item.id}
                id={item.id}
                username={item.sender.username}
                status={item.status}
                profile_photo={item.sender.profile_photo}
                sent={false}
              />
            ))
          ) : (
            <NoFriendComponent />
          )}
        </div>
      </TabsContent>
      <TabsContent value="send">
        <div className="max-w-[800px] mx-auto">
          {sentRequest?.friendRequests?.length !== 0 ? (
            sentRequest?.friendRequests?.map((item: any) => (
              <RequestBox
                key={item.id}
                id={item.id}
                username={item.receiver.username}
                status={item.status}
                profile_photo={item.receiver.profile_photo}
                sent={true}
              />
            ))
          ) : (
            <NoFriendComponent />
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
