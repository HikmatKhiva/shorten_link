import GenerateUrl from "../components/forms/GenerateUrl";
const CreateLink = () => {
  return (
    <section className="flex-grow ">
      <div className="bg-primary-blue py-6 px-3 mt-10 max-w-[600px] md:w-[500px] min-w-[250px] mx-auto rounded">
        <h2 className="text-center text-white mb-2 text-lg">
          Generate short link
        </h2>
        <GenerateUrl />
      </div>
    </section>
  );
};
export default CreateLink;
