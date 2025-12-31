<script setup lang="ts">
useSeoMeta({
  title: 'Condiciones de Venta - Agua Dulce',
  description: 'Condiciones generales de venta y contratación de Agua Dulce.',
})
</script>

<template>
  <div class="min-h-screen bg-cream-50">
    <div class="container-app py-10 md:py-16">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-3xl md:text-4xl font-serif font-semibold text-warm-800 mb-8">
          Condiciones de Venta
        </h1>

        <div class="bg-white rounded-2xl p-6 md:p-8 shadow-soft border border-cream-200 prose prose-warm max-w-none">
          <p class="text-warm-600 mb-6">
            <em>Última actualización: [FECHA]</em>
          </p>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-warm-800 mb-4">1. Identificación del vendedor</h2>
            <ul class="list-none text-warm-600 space-y-1">
              <li><strong>Nombre/Razón social:</strong> [NOMBRE O RAZÓN SOCIAL]</li>
              <li><strong>NIF/CIF:</strong> [NIF/CIF]</li>
              <li><strong>Dirección:</strong> [DIRECCIÓN COMPLETA]</li>
              <li><strong>Email:</strong> [EMAIL DE CONTACTO]</li>
              <li><strong>Teléfono:</strong> [TELÉFONO]</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-warm-800 mb-4">2. Objeto</h2>
            <p class="text-warm-600">
              Las presentes condiciones regulan la venta de productos de joyería artesanal a través de la tienda
              online de Agua Dulce. Al realizar un pedido, el cliente acepta íntegramente estas condiciones.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-warm-800 mb-4">3. Productos</h2>
            <p class="text-warm-600 mb-4">
              Todos nuestros productos son piezas de joyería artesanal elaboradas a mano. Debido a su naturaleza
              artesanal, pueden existir pequeñas variaciones en color, tamaño o acabado que las hacen únicas.
            </p>
            <p class="text-warm-600">
              Las imágenes de los productos son orientativas. Nos esforzamos por mostrar los colores y características
              de forma fiel, pero pueden existir diferencias debido a la configuración de su pantalla.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-warm-800 mb-4">4. Precios</h2>
            <p class="text-warm-600 mb-4">
              Todos los precios mostrados incluyen IVA (cuando aplique) y están expresados en euros (€).
              Los gastos de envío se calcularán e indicarán antes de finalizar la compra.
            </p>
            <p class="text-warm-600">
              Nos reservamos el derecho de modificar los precios en cualquier momento, sin que ello afecte
              a los pedidos ya confirmados.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-warm-800 mb-4">5. Proceso de compra</h2>
            <ol class="list-decimal list-inside text-warm-600 space-y-2">
              <li>Seleccione los productos que desea y añádalos al carrito</li>
              <li>Acceda al carrito y revise su pedido</li>
              <li>Introduzca sus datos de envío</li>
              <li>Seleccione el método de pago</li>
              <li>Confirme el pedido</li>
              <li>Recibirá un código de seguimiento para consultar el estado de su pedido</li>
            </ol>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-warm-800 mb-4">6. Métodos de pago</h2>
            <p class="text-warm-600 mb-4">
              Aceptamos los siguientes métodos de pago:
            </p>
            <ul class="list-disc list-inside text-warm-600 space-y-2">
              <li><strong>Tarjeta de crédito/débito:</strong> Visa y Mastercard (procesado por Stripe)</li>
              <li><strong>Bizum:</strong> Pago instantáneo desde tu móvil</li>
              <li><strong>Transferencia bancaria:</strong> A nuestra cuenta bancaria</li>
            </ul>
            <p class="text-warm-600 mt-4">
              Los pagos con tarjeta se procesan de forma segura a través de Stripe. En ningún momento
              tenemos acceso a los datos completos de su tarjeta.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-warm-800 mb-4">7. Envíos</h2>
            <p class="text-warm-600 mb-4">
              Realizamos envíos a toda España peninsular. Los plazos de entrega estimados son de 3-7 días
              laborables desde la confirmación del pago.
            </p>
            <p class="text-warm-600">
              Los productos se envían cuidadosamente embalados para garantizar su protección durante el transporte.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-warm-800 mb-4">8. Derecho de desistimiento</h2>
            <p class="text-warm-600 mb-4">
              De conformidad con la legislación vigente, dispone de un plazo de <strong>14 días naturales</strong>
              desde la recepción del producto para ejercer su derecho de desistimiento sin necesidad de justificación.
            </p>
            <p class="text-warm-600 mb-4">
              Para ejercer este derecho, debe comunicárnoslo por escrito a [EMAIL DE CONTACTO] indicando:
            </p>
            <ul class="list-disc list-inside text-warm-600 space-y-2">
              <li>Número de pedido</li>
              <li>Producto(s) a devolver</li>
              <li>Motivo (opcional)</li>
            </ul>
            <p class="text-warm-600 mt-4">
              <strong>Condiciones para la devolución:</strong>
            </p>
            <ul class="list-disc list-inside text-warm-600 space-y-2">
              <li>El producto debe estar en su estado original, sin usar</li>
              <li>Debe conservar el embalaje original</li>
              <li>Los gastos de devolución corren a cargo del cliente</li>
              <li>El reembolso se realizará en un plazo máximo de 14 días desde la recepción del producto</li>
            </ul>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-warm-800 mb-4">9. Garantía</h2>
            <p class="text-warm-600">
              Todos nuestros productos cuentan con una garantía de 2 años conforme a la legislación vigente.
              La garantía cubre defectos de fabricación, pero no el desgaste normal por uso ni los daños
              causados por un uso inadecuado.
            </p>
          </section>

          <section class="mb-8">
            <h2 class="text-xl font-semibold text-warm-800 mb-4">10. Reclamaciones</h2>
            <p class="text-warm-600 mb-4">
              Para cualquier reclamación, puede contactarnos a través de:
            </p>
            <ul class="list-none text-warm-600 space-y-1">
              <li><strong>Email:</strong> [EMAIL DE CONTACTO]</li>
              <li><strong>Teléfono:</strong> [TELÉFONO]</li>
            </ul>
            <p class="text-warm-600 mt-4">
              También puede acceder a la plataforma europea de resolución de litigios en línea:
              <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener" class="text-gold-600 hover:underline">
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
          </section>

          <section>
            <h2 class="text-xl font-semibold text-warm-800 mb-4">11. Ley aplicable</h2>
            <p class="text-warm-600">
              Las presentes condiciones se rigen por la legislación española. Para cualquier controversia
              derivada de estas condiciones, las partes se someten a los juzgados y tribunales del domicilio
              del consumidor.
            </p>
          </section>
        </div>

        <div class="mt-8 text-center">
          <NuxtLink to="/" class="text-gold-600 hover:text-gold-700 transition-colors">
            ← Volver a la tienda
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
