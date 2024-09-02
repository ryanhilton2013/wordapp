import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ErrorBoxProps {
  title?: string;
  description: string;
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ title = "Error", description="" }) => {
  return (
    <>
    {description.length > 0 && (
        <div className="max-w-md w-full flex flex-col">
        <Alert variant="destructive" className="my-4 p-2">
            <div className="ml-3">
                <AlertTitle>{title}</AlertTitle>
                <AlertDescription>{description}</AlertDescription>
            </div>
        </Alert>
        </div>
    )}
    </>
  );
};

export default ErrorBox;