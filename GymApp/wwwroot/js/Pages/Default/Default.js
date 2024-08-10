document.addEventListener("DOMContentLoaded", function () {
    const membershipButtons = document.querySelectorAll(".membership-button");
    const userId = localStorage.getItem('userId');

    membershipButtons.forEach(button => {
        button.addEventListener("click", function () {
            const membershipType = this.dataset.membershipType;
            const amount = this.dataset.amount;

            Swal.fire({
                title: `Purchase ${membershipType} Membership`,
                html: `
                    <form id="paymentForm" enctype="multipart/form-data">
                        <label for="paymentMethod">Payment Method:</label>
                        <select id="paymentMethod" name="paymentMethod" class="swal2-input">
                            <option value="Cash">Cash</option>
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Sinpe">Sinpe Moóvil</option>
                        </select>
                        <label for="receiptImage">Upload Receipt:</label>
                        <input type="file" id="receiptImage" name="receiptImage" class="swal2-input" accept="image/*" required />
                        <input type="hidden" name="membershipType" value="${membershipType}" />
                    </form>
                `,
                showCancelButton: true,
                confirmButtonText: 'Submit Payment',
                preConfirm: () => {
                    const form = Swal.getPopup().querySelector('#paymentForm');
                    const formData = new FormData(form);
                    return formData;
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const formData = result.value;
                    const receiptImageFile = formData.get('receiptImage');

                    if (receiptImageFile) {
                        const reader = new FileReader();

                        reader.onload = function () {
                            // Añadir la imagen codificada en Base64 al FormData
                            formData.append('receiptImageBase64', reader.result.split(',')[1]);
                            formData.append('userId', userId); // Añadir userId al formData
                           
                            // Enviar los datos al servidor
                            $.ajax({
                                url: '/Membership/ProcessPayment',
                                type: 'POST',
                                data: formData,
                                processData: false,
                                contentType: false,
                                success: function (data) {
                                    if (data.success) {
                                        Swal.fire('Success!', 'Your payment has been submitted.', 'success');
                                    } else {
                                        Swal.fire('Error!', 'There was an error processing your payment.', 'error');
                                    }
                                },
                                error: function (error) {
                                    console.error('Error:', error);
                                    Swal.fire('Error!', 'There was an error processing your payment.', 'error');
                                }
                            });
                        };

                        reader.readAsDataURL(receiptImageFile);
                    }
                }
            });
        });
    });
});