<div className="space-y-2">
  <div className="relative w-full">

    {/* Icon Box */}
    <div className="absolute left-0 top-0 h-full w-12 bg-gray-200 flex items-center justify-center border-r rounded-l-md">
      <MapPinPlus className="w-5 h-5 text-gray-600" />
    </div>

    {/* Floating Label */}
    <label
      className="
        absolute left-12 top-1/2 -translate-y-1/2 
        text-gray-500 pointer-events-none
        transition-all duration-200 
        peer-focus:text-amber-600 
        peer-focus:top-2 peer-focus:text-xs 
        peer-placeholder-shown:top-1/2 
        peer-placeholder-shown:text-base
      "
    >
      এড্রেস <span className="text-red-500">*</span>
    </label>

    {/* Input */}
    <Input
      placeholder=" "  {/* required: keeps label floating behavior */}
      className="
        peer w-full pl-14 pr-3 py-3 
        border rounded-md 
        focus-visible:ring-amber-600 
        focus:border-amber-600
      "
    />
  </div>
</div>