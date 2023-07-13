import Image from "next/image";

export default function IndividualReply() {

  return (
    <article className="p-6 mb-6 ml-6 lg:ml-12 text-base  rounded-lg ">
      <footer className="flex justify-between items-center mb-2">
        <div className="flex items-center">
          <p className="inline-flex items-center mr-3 text-sm  text-white"><Image
            width={4}
            height={4}
            className="mr-2 w-6 h-6 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="Jese Leos" />Jese Leos</p>
          <p className="text-sm  text-gray-400">Feb. 12, 2022</p>
        </div>
        <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
          className="inline-flex rounded-lg items-center p-2 text-sm font-medium text-center focus:ring-4 focus:outline-none   hover:bg-gray-700 focus:ring-gray-600"
          type="button">
          <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
            </path>
          </svg>
          <span className="sr-only">Comment settings</span>
        </button>

        <div id="dropdownComment2"
          className="hidden z-10 w-36 rounded divide-y shadow  divide-gray-600">
          <ul className="py-1 text-sm text-gray-200"
            aria-labelledby="dropdownMenuIconHorizontalButton">
            <li>
              <a href="#"
                className="block py-2 px-4  hover:bg-gray-600 hover:text-white">Edit</a>
            </li>
            <li>
              <a href="#"
                className="block py-2 px-4  hover:bg-gray-600 hover:text-white">Remove</a>
            </li>
            <li>
              <a href="#"
                className="block py-2 px-4  hover:bg-gray-600 hover:text-white">Report</a>
            </li>
          </ul>
        </div>
      </footer>
      <p className=" text-gray-400">Much appreciated! Glad you liked it ☺️</p>
      <div className="flex items-center mt-4 space-x-4">
        <button type="button"
          className="flex items-center text-sm  hover:underline text-gray-400">
          <svg aria-hidden="true" className="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
          Reply
        </button>
      </div>
    </article>
  )
}