import { DeliveryDetails , CartDetails } from "../../models/order.model";

export const orderSuccessTemplate = (
  deliveryDetails: DeliveryDetails,
  cartDetails: CartDetails[]
): string => {
  const { fullname, address, city, email } = deliveryDetails;

  const cartItemsHTML = cartDetails
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #ddd;">
        <td style="padding: 10px;">
          <img src="${item.imageUrl}" alt="${item.name}" width="60" height="60" style="border-radius: 8px;" />
        </td>
        <td style="padding: 10px; text-align: left;">
          <div style="font-weight: bold;">${item.name}</div>
          <div>Qty: ${item.quantity}</div>
        </td>
        <td style="padding: 10px; text-align: right;">
          ₹${(item.price * item.quantity).toFixed(2)}
        </td>
      </tr>`
    )
    .join("");

  const totalPrice = cartDetails.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Order Confirmation - FoodZone</title>
    <style>
      body {
        background-color: #ffffff;
        font-family: Arial, sans-serif;
        font-size: 16px;
        color: #333333;
        margin: 0;
        padding: 0;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
      }

      .message {
        font-size: 24px;
        font-weight: bold;
        color: #f97316;
        margin-bottom: 20px;
      }

      .body {
        text-align: left;
        font-size: 16px;
        margin-bottom: 30px;
      }

      .order-summary {
        border-collapse: collapse;
        width: 100%;
        margin-top: 10px;
      }

      .total {
        text-align: right;
        font-size: 18px;
        font-weight: bold;
        padding: 15px 0;
        color: #f97316;
      }

      .support {
        font-size: 14px;
        color: #666666;
        margin-top: 30px;
      }

      .highlight {
        font-weight: bold;
        color: #f97316;
      }
    </style>
  </head>

  <body>
    <div class="container">
      <div class="message""Your order has been received, ${fullname} thank you! 🎉</div>
      <div class="body">
        <p>We've received your order and it's already being prepared by our chefs! 😋</p>
        
        <p><span class="highlight">Delivery Address:</span><br />
        ${address}, ${city}<br />
        ${email}</p>

        <h3 style="margin-top: 30px; color: #f97316;">Order Summary</h3>
        <table class="order-summary">
          ${cartItemsHTML}
        </table>

        <div class="total">Total: ₹${totalPrice.toFixed(2)}</div>

        <p>Your food will be delivered shortly. Stay hungry, stay happy! 🍔🍟🍕</p>
      </div>

      <div class="support">
        Need help? Reach out to our support at 
        <a href="mailto:support@flavortrails.com" style="color: #f97316;">support@flavortrails.com</a>
      </div>
    </div>
  </body>
</html>`;
};
