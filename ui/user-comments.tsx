import Image from "next/image";
import IndividualComment from "./individual-comment";

export default function UserComments() {

  return (
    <section className="py-8 lg:py-16">
      <div className="max-w-2xl mx-auto px-4">
        
        <IndividualComment />
        <IndividualComment />
        
      </div>
    </section>
  )
}