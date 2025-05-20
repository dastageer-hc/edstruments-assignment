import Navbar from "../components/navbar";
import DynamicForm from "../components/dynamicForm";
import PdfUploadViewer from "../components/pdf-view";
export default function Invoice() {


    return (
        <div className=" bg-gray-200 min-h-screen ">
            <Navbar />
            <div className="flex  justify-center items-start h-full w-full">
                <PdfUploadViewer />
                <DynamicForm />
            </div>
        </div>
    );
}
