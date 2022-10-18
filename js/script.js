const $contactTable = document.querySelector('#contact');
const $frmAddContact = document.querySelector('#frmAddContact');
const $searchInput = document.querySelector('#search-input');

const renderContacts = () => {
  fetch('http://www.raydelto.org/agenda.php')
    .then((res) => res.json())
    .then((data) => {
      data.forEach((e) => {
        $contactTable.innerHTML += `<tr data-filter="${e.nombre.toLowerCase()}">
            <td>${e.nombre}</td>
            <td>${e.apellido}</td>
            <td>${e.telefono}</td>
        </tr>`;
      });
    });
};

$frmAddContact.addEventListener('submit', (e) => {
  const nombre = document.forms['frmAddContact']['iptNombre'].value;
  const apellido = document.forms['frmAddContact']['iptApellido'].value;
  const telefono = document.forms['frmAddContact']['iptTelefono'].value;

  const contacto = { nombre, apellido, telefono };
  fetch('http://www.raydelto.org/agenda.php', {
    method: 'POST',
    body: JSON.stringify(contacto),
  });
});

$searchInput.addEventListener('input', (e) => {
  //initializations
  let searchInput = $searchInput.value;
  let trs = $contactTable.querySelectorAll('tr');

  trs.forEach((tr) => {
    if (tr.dataset.filter.includes(searchInput.toLowerCase())) {
      tr.classList.remove('d-none');
    } else {
      tr.classList.add('d-none');
    }
  });
});
renderContacts();
