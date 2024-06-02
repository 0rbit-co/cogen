const Warning = () => {
    return (
        <div className="border-2 border-[#D16D1B] px-4 py-1 bg-[#D16D1B]/20 text-[#D16D1B] rounded-lg">
        <p>Currently you can only generate text for ~300 words only due to API rate limit</p>
        </div>
    );
}

export default Warning;