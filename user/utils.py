from user.models import User


def check_data_valid(data: dict, key_required: dict) -> True or str:
    for key, value in key_required.items():
        if not isinstance(data.get(key, None), value):
            if data.get(key, None) is None:
                return 'not found key "{}"'.format(key)
            return '{} value not correct, expected value <{}>'.format(key, value)
    return True


def create_user(data: dict) -> object:
    user = User(**data)




