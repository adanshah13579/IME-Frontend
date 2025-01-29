import GetStartedModal from "./GetStartedModal";

export default function GetStarted({ onContinue }: { onContinue: () => void }) {
  return (
    <div className="flex flex-col gap-4 items-center my-6">
      <h1 className="text-6xl font-bold">No need for a MiddleMan</h1>
      <p>
        We’re here to handle the hard stuff, making the process easy & hassle
        free for you!
      </p>
      {/* Pass onContinue as a prop to GetStartedModal */}
      <GetStartedModal onContinue={onContinue}>
        Start your 30 day FREE Trial
      </GetStartedModal>
    </div>
  );
}
