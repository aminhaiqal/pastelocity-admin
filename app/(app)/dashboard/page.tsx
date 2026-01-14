import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import data from "./data.json"

export default function Page() {
  return (
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight ml-6">
                Pending Order
              </h4>
              <DataTable data={data} />
            </div>
          </div>
        </div>
  )
}
