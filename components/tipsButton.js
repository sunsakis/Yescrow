import Link from "next/link";

export default function TipsButton() {
    return (
            <div class="justify-center flex">
                <Link 
                    href="/how-to-not-get-scammed">
                    <button 
                        class="mt-3 bg-red-500 hover:bg-matrix text-white font-bold py-2 px-4 rounded"
                        >
                    HOW TO USE
                    </button>
                </Link>
            </div>

    )
}