import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
interface AboutWordProps {
  definitions: string[];
  word: string;
}

const AboutWord: React.FC<AboutWordProps> = ({ definitions=[], word = "" }) => {
  return (
    <>
      {definitions.length > 0 && (
        <div className="max-w-md w-full flex flex-col">
          <h1 className="mb-4 text-lg mt-5 leading-none">
            Definition(s) {word.length > 0 && `for the word ${word}.`}
          </h1>
          <ScrollArea className="flex flex-col rounded-md border max-w-md w-full max-h-72 overflow-y-auto">
            <div className="p-4">
              <div className="text-sm">
                {definitions.map((value, index) => (
                  <div key={value}>
                    <div>{value}</div>
                    {index < definitions.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </div>
      )}
    </>
  );
};

export default AboutWord;
