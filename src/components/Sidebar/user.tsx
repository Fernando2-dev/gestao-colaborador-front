export const UsersSpace = () => {
    return (
        <div className="flex flex-col gap-4 rounded-lg bg-violet-50 px-4 py-5">
            <div className="space-y-1 flex flex-col">
                <span className="text-sm/5 font-medium">Used space</span>
                <span>Your tram used 80% of your avaliable space. Need more ?</span>
            </div>
            <div className="h-2 rounded-full bg-violet-100">
                <div className="h-2 w-4/5 rounded-full bg-violet-600 " />
            </div>

            <div className="space-x-3">
                <button type="button" className="text-sm font-medium text-violet-700">Dismiss</button>
                <button type="button" className="text-sm font-medium text-violet-700">Upgrade plan</button>
            </div>
        </div>
    )
}