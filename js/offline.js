export const offline = (() => {

    let alert = null;

    const show = (isUp) => new Promise((res) => {
        let op = parseFloat(alert.style.opacity);
        let clear = null;

        const callback = () => {
            if (!isUp && op > 0) {
                op -= 0.05;
                alert.style.opacity = op.toFixed(2);
                return;
            }

            if (isUp && op < 1) {
                op += 0.05;
                alert.style.opacity = op.toFixed(2);
                return;
            }

            res();
            clearInterval(clear);
            clear = null;

            if (op <= 0) {
                alert.style.opacity = '0';
                return;
            }

            if (op >= 1) {
                alert.style.opacity = '1';
                return;
            }
        };

        clear = setInterval(callback, 10);
    });

    const setOffline = () => {
        alert.firstElementChild.firstElementChild.classList.remove('bg-success');
        alert.firstElementChild.firstElementChild.classList.add('bg-danger');
        alert.firstElementChild.firstElementChild.firstElementChild.innerHTML = '<i class="fa-solid fa-ban me-1"></i>Koneksi tidak tersedia';
    };

    const setOnline = () => {
        alert.firstElementChild.firstElementChild.classList.remove('bg-danger');
        alert.firstElementChild.firstElementChild.classList.add('bg-success');
        alert.firstElementChild.firstElementChild.firstElementChild.innerHTML = '<i class="fa-solid fa-cloud me-1"></i>Koneksi tersedia kembali';
    };

    const onOffline = () => {
        setOffline();
        show(true);

        document.querySelectorAll('input[offline-disabled], button[offline-disabled], select[offline-disabled], textarea[offline-disabled]').forEach((e) => {
            if (e.tagName === 'BUTTON') {
                e.classList.add('disabled');
            } else {
                e.setAttribute('disabled', 'true');
            }
        });
    };

    const onOnline = () => {
        setOnline();

        let timeout = null;
        timeout = setTimeout(async () => {
            clearTimeout(timeout);
            timeout = null;
            await show(false);
            setOffline();
        }, 3000);

        document.querySelectorAll('input[offline-disabled], button[offline-disabled], select[offline-disabled], textarea[offline-disabled]').forEach((e) => {
            if (e.tagName === 'BUTTON') {
                e.classList.remove('disabled');
            } else {
                e.removeAttribute('disabled');
            }
        });
    };

    const init = () => {
        window.addEventListener('online', onOnline);
        window.addEventListener('offline', onOffline);
        alert = document.getElementById('offline-mode');
    };

    return {
        init
    };
})();