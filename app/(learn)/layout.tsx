export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="py-32">

      <div className="space-y-8 px-2 pt-20 lg:py-8 lg:px-8">


        {/* <div className="rounded-lg bg-vc-border-gradient p-px shadow-lg shadow-black/20">
              <div className="rounded-lg bg-black">
                <AddressBar />
              </div>
            </div> */}

        {children}

      </div>
    </div>
  )
}
