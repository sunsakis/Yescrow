import Link from "next/link";

export default function EscrowButton() {
    return (
            <div class="justify-center flex">
                <Link 
                    href="/">
                    <button 
                        class="mt-3 bg-matrix hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                        >
                    ESCROW NOW
                    </button>
                </Link>
            </div>

    )
}