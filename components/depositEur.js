import React, { useState } from 'react';
 
export default function EurEscrowForm() {

  const [_senderEmail, setSenderAddress] = useState('')
  const [_receiverEmail, setReceiverAddress] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)

  function handleSenderChange(e) {
    setSenderAddress(e.target.value);
  }

  function handleReceiverChange(e) {
    setReceiverAddress(e.target.value);
  }

  function EscrowButton() {
    return (
            <div class="justify-center flex">
                    <button 
                        type="submit"
                        disabled={buttonDisabled}
                        class="mt-3 bg-matrix hover:bg-green-400 text-white font-bold py-2 px-4 rounded"
                        >
                    SUBMIT
                    </button>
            </div>

    )
}


    async function sendEmail(e) {
        try {
            e.preventDefault();
            setButtonDisabled(true);
            await fetch("/api/depositMail", {
                body: JSON.stringify({
                sender: _senderEmail,
                receiver: _receiverEmail
                }),
            headers: {
            "Content-Type": "application/json",
            },
            method: "POST",
            });
            alert("Email sent! We will contact you shortly.");
            }
        catch (error) {
            console.log(error)}
    }

  return (
        <form onSubmit={sendEmail}
        >
          <div class="m-2 flex justify-center border-2 p-5 rounded-3xl bg-[#161618]"
                id="EscrowEuro">
              <div>
                <label class="justify-center flex mb-2">Your email:</label>
                <input class="text-center rounded-xl mb-2 max-w-xs sm:max-w-md"
                  type="email" 
                  placeholder="@"
                  required
                  size="50"
                  onChange={handleSenderChange} 
                />
                <label class="justify-center flex mb-2">Email of receiver (optional):</label>
                <input
                  class="rounded-xl mb-2 text-center max-w-xs sm:max-w-md"
                  type="email" 
                  placeholder="@" 
                  size="50"
                  onChange={handleReceiverChange} 
                />
                <li class="flex justify-center">
                <EscrowButton />
                </li>
                <p class="text-xs mt-5 text-center">*We will send you an email with the bank account details.</p>
              </div>
        </div>
        </form>
  );
}
