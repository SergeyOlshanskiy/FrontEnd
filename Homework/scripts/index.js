(function () {
    window.renderTriangle = function () {
        var char = getRandomChar();
        var content = '';
        for (var i = 0; i < getRandomInt(1, 7); i++) {
            content += char;
            console.log(content);
        }
    };

    function getRandomInt(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getRandomChar()
    {
        var chars = 'abcdefghijklmnopqrstuvwxyz1234567890~!@#$%^&*()-=_+/';
        var position = getRandomInt(0, chars.length - 1);
        return chars[position];
    }
})();